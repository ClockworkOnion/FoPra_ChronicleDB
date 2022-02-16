#!/usr/bin/env python3
from datetime import datetime
from urllib import response
from xml.dom import ValidationErr
from attr import validate
from flask import Flask, request
from flask import jsonify, make_response
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import requests
import jwt, json
import helper
import usermanagement as um
import userlogs
import validation
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

app = Flask(__name__)
api = Api(app)
cors = CORS(app) # Adding CORS header
app.config['CORS_HEADERS'] = 'Content-Type' # Adding CORS header
scheduler = BackgroundScheduler()

USERFILE = "users.dat"
SECRET = "secretf"
PERIODIC_TASK_INTERVAL = 30
# chronicleUrl wird in der main erstellt

def do_periodic_tasks():
    print(30 * "-" + " Executing periodic tasks (Interval " + str(PERIODIC_TASK_INTERVAL) + " seconds) " + 30 * "-")
    jobs = userlogs.getAllDueJobs()
    for j in jobs:
        print("\nUser Name: " + str(j["username"] + ", Type: " + str(j["job"]["requestType"])))
        helper.indentPrint("Job Data", str(j["job"]))

        if (j["job"]["requestType"] == "Right Flank"):
            print("Getting right flank according to job. Response from chronicle:")
            response = requests.get(chronicleUrl + "show_right_flank/" + str(j["job"]["config"]["data"]["stream"]["id"]))
            write_task_response_to_log(j, response)

        if (j["job"]["requestType"] == "Time Travel"):
            print("Time Travel according to job. Response from chronicle:")
            exclusive_or_inclusive = j["job"]["config"]["data"]["type"]
            from_timestamp = j["job"]["config"]["data"]["from"]
            to_timestamp = j["job"]["config"]["data"]["to"]
            request_body = '{"'+exclusive_or_inclusive+'":{"start":'+str(from_timestamp)+',"end":'+str(to_timestamp)+'}'+'}'
            response = requests.post(chronicleUrl + "query_time_travel/" + str(j["job"]["config"]["data"]["streamId"]), request_body)
            write_task_response_to_log(j, response)
    print(30 * "-" + " Finished periodic tasks. " + 30 * "-")

def write_task_response_to_log(job, response):
    if (response.status_code != 200):
        print("Request to chronicleDB unsuccessful!")
        return
    helper.indentPrint("Chronicle Task Response", str(response.json()))
    logEntry = {}
    logEntry["timeStamp"] = str(datetime.now())
    logEntry["streamId"] = job["job"]["streamId"]
    logEntry["requestType"] = job["job"]["requestType"]
    if ("info" in job["job"]):
        logEntry["info"] = job["job"]["info"]
    logEntry["payload"] = str(response.json())
    helper.indentPrint("Created new Log Entry", str(logEntry))
    userlogs.appendToLog(job["username"], logEntry)
    userlogs.addToNextRunTimestamp(job["username"], job["job"], job["job"]["interval"]["value"])
    print("User " + job["username"] + " log written and done. Next run in " + str(job["job"]["interval"]["value"]) + " seconds.")

# JOB METHODEN ##################################################################################################

@app.route('/delete_job', methods=['POST'])
def delete_job():
    if not validateToken(request, "Delete Job"):
        return make_response({"Access" : "denied!!"}, 403)
    print(request.data)
    return make_response({"mission" : "Complete"})

@app.route('/add_scheduled_job', methods=['POST'])
def add_scheduled_job():
    if not validateToken(request, "Add scheduled Job"):
        return make_response({"Access" : "denied!!"}, 403)
    info = jwt.decode(request.headers["Authorization"], key=SECRET, algorithms=['HS256', ])
    username = (info["username"])
    data = json.loads(request.data) 
    print("Received request:\n" + str(request.data) + "\nCreating job...")
    userlogs.addScheduledJob(str(username), data)
    return make_response({"mission" : "Complete"})

@app.route('/get_due_jobs/<user_id>', methods=['GET'])
def getDueJobs(user_id):
    if not validateToken(request, "Get Due Jobs"):
        return make_response({"Access" : "denied!!"}, 403)
    logs = userlogs.getUserDueJobs(user_id)
    return make_response({"jobs" : logs})

@app.route('/get_all_jobs/<user_id>', methods=['GET'])
def getAllJobs(user_id):
    if not validateToken(request, "Get User Jobs"):
        return make_response({"Access" : "denied!!"}, 403)
    logs = userlogs.getAllUserJobs(user_id)
    return make_response({"jobs" : logs})

@app.route('/get_user_log/<user_id>', methods=['GET'])
def get_user_log(user_id):
    if not validateToken(request, "Get User Log"):
        return make_response({"Access" : "denied!!"}, 403)
    return make_response(userlogs.get_user_log(user_id))

# CHRONICLE METHODEN ############################################################################################

@app.route('/set_server_url', methods=['POST'])
def setServerUrl():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Set server URL") and validation.isUserAdmin(token)): 
        return make_response({"Access" : "denied!!"}, 403)
    data = json.loads(request.data)
    helper.indentPrint("Set server URL request data", str(data))

    global chronicleUrl
    chronicleUrl = data["url"]
    with open("config.dat", "w")as outfile:
        json.dump(data, outfile)
    print("Changed Server URL to " + chronicleUrl)
    return make_response({"message": "Successfully changed Server URL"})

@app.route('/get_server_url', methods=['GET'])
def getServerUrl():
    if not validateToken(request, "Getting Server URL"):
        return make_response({"Access" : "denied!!"}, 403)
    return make_response({"url": chronicleUrl})

@app.route('/show_right_flank/<stream_id>', methods=['GET'])
def showRightFlank(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Show Right Flank on Stream " + str(stream_id)) and validation.canUserRead(token, stream_id)): 
        return make_response({"Access" : "denied!!"}, 403)

    print("Trying to get right flank from ChronicleDB at " + chronicleUrl + "show_right_flank/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "show_right_flank/" + stream_id)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return jsonify(response.json())

@app.route('/stream_info/<stream_id>', methods=['GET'])
def streamInfo(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Stream info on id " + str(stream_id)) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    print("Trying to get stream info from ChronicleDB at "+chronicleUrl+"stream_info/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "stream_info/" + stream_id)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/shutdown_stream/<stream_id>', methods=['GET'])
def shutdownStream(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Shutdown Stream id " + str(stream_id)) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    print("Trying to get stream info from ChronicleDB at " + chronicleUrl + "shutdown_stream/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "shutdown_stream/" + stream_id)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/recover_stream_snapshot/<stream_id>', methods=['GET'])
def recoverStreamSnapshot(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Recover Stream id " + str(stream_id)) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    print("Trying to get stream info from ChronicleDB at " + chronicleUrl + "recover_stream_snapshot/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "recover_stream_snapshot/" + stream_id)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/create_stream', methods=['POST'])
def createStream():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Create Stream") and validation.canUserCreateStreams(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    helper.indentPrint("Create Stream Request", str(request.data))

    response = requests.post(chronicleUrl + "create_stream", request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return {"response from ChronicleDB": str(response) } 

@app.route('/insert_ordered/<stream_id>', methods=['POST'])
def insertOrdered(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Insert ordered to id " + str(stream_id)) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.post(chronicleUrl + "insert_ordered/" + stream_id, request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    if (response.status_code != 200):
        return make_response(response._content, response.status_code)
    return {}

@app.route('/query_time_travel/<stream_id>', methods=['POST'])
def queryTimeTravel(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Time Travel on stream id " + str(stream_id)) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.post(chronicleUrl + "query_time_travel/" + stream_id, request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return jsonify(response.json())

@app.route('/show_streams', methods=['GET'])
def showStreams():
    if not (validateToken(request, "Show Streams")):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "show_streams", request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return jsonify(response.json())

@app.route('/max_key/<stream_id>', methods=['GET'])
def maxKey(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Max Key on id " + str(stream_id)) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "max_key/" + stream_id, request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/min_key/<stream_id>', methods=['GET'])
def minKey(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Min Key on id " + str(stream_id)) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "min_key/" + stream_id, request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/tree_height/<stream_id>', methods=['GET'])
def treeHeight(stream_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Tree height on id" + str(stream_id)) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "tree_height/" + stream_id, request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

@app.route('/system_info', methods=['GET'])
def systemInfo():
    if not (validateToken(request, "System Info")):  
        return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "system_info", request.data)
    helper.indentPrint("Response from ChronicleDB", str(response))
    return response.text

# LOGIN METHODEN ################################################################################################

@app.route('/user_login', methods=['POST'])
def logMeIn():
        print("userLogin post request received. Printing request:")
        print(request.data)
        jsonObject = json.loads(request.data)
        print("-----")
        print(jsonObject)
        print(" --- End of request ---")
        if (um.checkPassword(jsonObject["username"], jsonObject["password"])):
            res_body = um.JWTcreateToken(jsonObject["username"])
            response = make_response({"token" : res_body}, 200)
            response.headers["Content-Type"] = "json"
            print("Response created:")
            print(response)
            return response

@app.route('/user', methods=['GET'])
def getUsers():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Get Users") and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)

    helper.indentPrint("Request for user IDs", str(request.data))
    res_body = um.getUserIds()
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    helper.indentPrint("Sending created response", str(response))
    return response

@app.route('/user/<user_id>', methods=['GET'])
def getInfoById(user_id):
    token = request.headers["Authorization"]
    if not (validateToken(request, "Get Info on user id " + str(user_id)) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)

    helper.indentPrint("User " + str(user_id) + " request", str(request.data))
    res_body = um.getUserAsMap(user_id)
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    helper.indentPrint("Sending created response", str(response))
    return response

@app.route('/allusers', methods=['GET'])
def getAllUsers():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Get All Users") and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    return make_response(um.getAllUsers(), 200)

@app.route('/create_user',methods=['POST'])
def createUser():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Create User") and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    response=json.loads(request.data)
    um.registerNewUser(response["username"],response["password"],response["isAdmin"],response["usesJavaVersion"],response["canCreateStream"],
    response["allowedStreams"],response["allowedInsertStreams"],response["allStreamsAllowed"],
    response["canInsertAll"])
    helper.indentPrint("Create User Response", str(response))
    return make_response(response,200)

@app.route('/delete_user', methods=['POST'])
def deleteUser():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Delete User") and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    response=json.loads(request.data)
    um.deleteUser(response)
    return make_response({"Deleting" : "Sucess"},200)

@app.route('/exists_user', methods =['POST'])
def existsUser():
    token = request.headers["Authorization"]
    if not (validateToken(request, "Check if user exists") and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    response=json.loads(request.data)
    tmp=um.userAlreadyExists(response)
    return make_response(jsonify(tmp),200)

def validateToken(request, info_text=None):
    token = request.headers["Authorization"]
    print("Validating Token... (Additional Info: " + str(info_text) + ")")
    if (token): print("Found Token. Verifying...")
    if not (validation.verifyJWT(token)):  
        return False
    return True

def loadUrl():
    with open("config.dat") as json_file:
        data = json.load(json_file)
    print(data)
    global chronicleUrl
    chronicleUrl = data["url"]

if __name__ == "__main__":
    # Set up scheduler
    loadUrl()
    scheduler.add_job(func=do_periodic_tasks, trigger="interval", seconds=PERIODIC_TASK_INTERVAL)
    scheduler.start()
    atexit.register(lambda: scheduler.shutdown())
    do_periodic_tasks()

    # Start backend process (use_reloader must be false or it will mess with scheduler)
    app.run(port=5002, debug=True, use_reloader=False) 
    # helper.testUserPwd()