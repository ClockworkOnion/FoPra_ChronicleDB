#!/usr/bin/env python3
from urllib import response
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


def do_periodid_tasks():
    print("Executing periodic tasks...")
    # Perdiodic tasks here
    print("Finished periodic tasks.")

# a change

USERFILE = "users.dat"
SECRET = "secret"
# chronicleUrl wird in der main erstellt

# JOB METHODEN ##################################################################################################

@app.route('/delete_job', methods=['POST'])
def delete_job():
    if not validateToken(request.headers["Authorization"]):
        return make_response({"Access" : "denied!!"}, 403)
    print(request.data)
    return make_response({"mission" : "Complete"})

@app.route('/add_scheduled_job', methods=['POST'])
def add_scheduled_job():
    if not validateToken(request.headers["Authorization"]):
        return make_response({"Access" : "denied!!"}, 403)
    print(request.data)
    return make_response({"mission" : "Complete"})

@app.route('/get_due_jobs/<user_id>', methods=['GET'])
def getDueJobs(user_id):
    if not validateToken(request.headers["Authorization"]):
        return make_response({"Access" : "denied!!"}, 403)
    logs = userlogs.getUserDueJobs(user_id)
    return make_response({"jobs" : logs})

@app.route('/get_all_jobs/<user_id>', methods=['GET'])
def getAllJobs(user_id):
    if not validateToken(request.headers["Authorization"]):
        return make_response({"Access" : "denied!!"}, 403)
    logs = userlogs.getAllUserJobs(user_id)
    return make_response({"jobs" : logs})

# CHRONICLE METHODEN ############################################################################################

@app.route('/set_server_url', methods=['POST'])
def setServerUrl():
    print("Received request for 'set_server_url'")
    data = json.loads(request.data)
    print(data)
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)): 
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################
    global chronicleUrl
    chronicleUrl = data["url"]
    with open("config.dat", "w")as outfile:
        json.dump(data, outfile)
    print("Changed Server URL to " + chronicleUrl)
    return make_response({"message": "Successfully changed Server URL"})

@app.route('/get_server_url', methods=['GET'])
def getServerUrl():
    print("Received request for 'get_server_url'")
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token)): 
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################
    return make_response({"url": chronicleUrl})

@app.route('/show_right_flank/<stream_id>', methods=['GET'])
def showRightFlank(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'show_right_flank'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)): 
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("Trying to get right flank from ChronicleDB at " + chronicleUrl + "show_right_flank/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "show_right_flank/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return jsonify(response.json())

@app.route('/stream_info/<stream_id>', methods=['GET'])
def streamInfo(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'stream_info':")

    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("Trying to get stream info from ChronicleDB at "+chronicleUrl+"stream_info/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "stream_info/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/shutdown_stream/<stream_id>', methods=['GET'])
def shutdownStream(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'shutdown_stream':")

    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("Trying to get stream info from ChronicleDB at " + chronicleUrl + "shutdown_stream/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "shutdown_stream/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/recover_stream_snapshot/<stream_id>', methods=['GET'])
def recoverStreamSnapshot(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'recover_stream_snapshot':")

    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("Trying to get stream info from ChronicleDB at " + chronicleUrl + "recover_stream_snapshot/" + stream_id + " ... ")
    response = requests.get(chronicleUrl + "recover_stream_snapshot/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/create_stream', methods=['POST'])
def createStream():
    print("Received request for 'create_stream':")
    print(request.data)
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserCreateStreams(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.post(chronicleUrl + "create_stream", request.data)
    print("Response from ChronicleDB: " + str(response))
    return {"response from ChronicleDB": str(response) } 

@app.route('/insert_ordered/<stream_id>', methods=['POST'])
def insertOrdered(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'insert_ordered':")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserWrite(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.post(chronicleUrl + "insert_ordered/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return {}

@app.route('/query_time_travel/<stream_id>', methods=['POST'])
def queryTimeTravel(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'query_time_travel'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.post(chronicleUrl + "query_time_travel/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return jsonify(response.json())

@app.route('/show_streams', methods=['GET'])
def showStreams():
    print("Received request for 'show_streams'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################
    # if not validation.isUserAdmin(request.headers["Authorization"]):
    #     return make_response({"Access" : "denied!!"}, 403)

    response = requests.get(chronicleUrl + "show_streams", request.data)
    print("Response from ChronicleDB: "+ str(response.text))
    return jsonify(response.json())

@app.route('/max_key/<stream_id>', methods=['GET'])
def maxKey(stream_id):
    print("Received request for 'max_key'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.get(chronicleUrl + "max_key/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/min_key/<stream_id>', methods=['GET'])
def minKey(stream_id):
    print("Received request for 'min_key'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.get(chronicleUrl + "min_key/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/tree_height/<stream_id>', methods=['GET'])
def treeHeight(stream_id):
    print("Received request for 'tree_height'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.canUserRead(token, stream_id)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.get(chronicleUrl + "tree_height/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/system_info', methods=['GET'])
def systemInfo():
    print("Received request for 'system_info'")
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response = requests.get(chronicleUrl + "system_info", request.data)
    print("Response from ChronicleDB: "+ str(response))
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
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("User IDs request received. Printing request:\n" + str(request.data))
    res_body = um.getUserIds()
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    print("Response created:\n" + str(response) + "\nEnd of response. Sending response...")
    return response

@app.route('/user/<user_id>', methods=['GET'])
def getInfoById(user_id):
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    print("User " + user_id + " request received. Printing request:\n" + str(request.data))
    res_body = um.getUserAsMap(user_id)
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    print("Response created:\n" + str(response) + "\nEnd of response. Sending response...")
    return response

@app.route('/allusers', methods=['GET'])
def getAllUsers():
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    return make_response(um.getAllUsers(), 200)

@app.route('/create_user',methods=['POST'])
def createUser():
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response=json.loads(request.data)
    um.registerNewUser(response["username"],response["password"],response["isAdmin"],response["canCreateStream"],
    response["allowedStreams"],response["allowedInsertStreams"],response["allStreamsAllowed"],response["canInsertAll"])
    print(response)
    return make_response(response,200)

@app.route('/delete_user', methods=['POST'])
def deleteUser():
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response=json.loads(request.data)
    um.deleteUser(response)
    return make_response({"Deleting" : "Sucess"},200)

@app.route('/exists_user', methods =['POST'])
def existsUser():
    
    # Validation #####################################
    print("Validating Token:")
    token = request.headers["Authorization"]
    if (token): print("Found Header")
    if not (validation.verifyJWT(token) and validation.isUserAdmin(token)):  
        return make_response({"Access" : "denied!!"}, 403)
    # Method #########################################

    response=json.loads(request.data)
    tmp=um.userAlreadyExists(response)
    return make_response(jsonify(tmp),200)


def validateToken(token):
    print("Validating Token:")
    if (token): print("Found Header")
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
    scheduler.add_job(func=do_periodid_tasks, trigger="interval", seconds=30)
    scheduler.start()
    atexit.register(lambda: scheduler.shutdown())

    # Start backend process (use_reloader must be false or it will mess with scheduler)
    app.run(port=5002, debug=True, use_reloader=False) 
    # helper.testUserPwd()