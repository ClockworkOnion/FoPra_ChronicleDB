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

app = Flask(__name__)
api = Api(app)
cors = CORS(app) # Adding CORS header
app.config['CORS_HEADERS'] = 'Content-Type' # Adding CORS header

USERFILE = "users.dat"
SECRET = "secret"

# CHRONICLE METHODEN ############################################################################################

@app.route('/show_right_flank/<stream_id>', methods=['GET'])
def showRightFlank(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'show_right_flank', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    print("Trying to get right flank from ChronicleDB at localhost:8000/show_right_flank/" + stream_id + " ... ")
    response = requests.get("http://127.0.0.1:8000/show_right_flank/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return jsonify(response.json())

@app.route('/stream_info/<stream_id>', methods=['GET'])
def streamInfo(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'stream_info', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    print("Trying to get stream info from ChronicleDB at localhost:8000/stream_info/" + stream_id + " ... ")
    response = requests.get("http://127.0.0.1:8000/stream_info/" + stream_id)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/create_stream', methods=['POST'])
def createStream():
    print("Received request for 'create_stream', printing headers:\n" + str(request.headers))
    print(request.data)
    response = requests.post("http://127.0.0.1:8000/create_stream", request.data)
    print("Response from ChronicleDB: " + str(response))
    return {"response from ChronicleDB": str(response) } 

@app.route('/insert_ordered/<stream_id>', methods=['POST'])
def insertOrdered(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'insert_ordered', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.post("http://127.0.0.1:8000/insert_ordered/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return {}

@app.route('/query_time_travel/<stream_id>', methods=['POST'])
def queryTimeTravel(stream_id):
    print("Stream ID: " + stream_id)
    print("Received request for 'query_time_travel', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.post("http://127.0.0.1:8000/query_time_travel/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return jsonify(response.json())

@app.route('/show_streams', methods=['GET'])
def showStreams():
    print("Received request for 'show_streams', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.get("http://127.0.0.1:8000/show_streams", request.data)
    print("Response from ChronicleDB: "+ str(response))
    return jsonify(response.json())

@app.route('/max_key/<stream_id>', methods=['GET'])
def maxKey(stream_id):
    print("Received request for 'max_key', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.get("http://127.0.0.1:8000/max_key/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/min_key/<stream_id>', methods=['GET'])
def minKey(stream_id):
    print("Received request for 'min_key', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.get("http://127.0.0.1:8000/min_key/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/tree_height/<stream_id>', methods=['GET'])
def treeHeight(stream_id):
    print("Received request for 'tree_height', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.get("http://127.0.0.1:8000/tree_height/" + stream_id, request.data)
    print("Response from ChronicleDB: "+ str(response))
    return response.text

@app.route('/system_info', methods=['GET'])
def systemInfo():
    print("Received request for 'system_info', printing headers:\n" + str(request.headers))
    # TODO: Verify web token against the password
    response = requests.get("http://127.0.0.1:8000/system_info", request.data)
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
    if not um.JWTverifyToken("dummy_token"): return make_response({"Access" : "denied!!"}, 403)
    print("User IDs request received. Printing request:\n" + str(request.data))
    res_body = um.getUserIds()
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    print("Response created:\n" + str(response) + "\nEnd of response. Sending response...")
    return response

@app.route('/user/<user_id>', methods=['GET'])
def getInfoById(user_id):
    if not um.JWTverifyToken("dummy_token"): return make_response({"Access" : "denied!!"}, 403)
    print("User " + user_id + " request received. Printing request:\n" + str(request.data))
    res_body = um.getUserAsMap(user_id)
    response = make_response({"ids" : res_body}, 200)
    response.headers["Content-Type"] = "json"
    print("Response created:\n" + str(response) + "\nEnd of response. Sending response...")
    return response

@app.route('/allusers', methods=['GET'])
def getAllUsers():
    return make_response(um.getAllUsers(), 200)

@app.route('/create_user',methods=['POST'])
def createUser():
    response=json.loads(request.data)
    um.registerNewUser(response["username"],response["password"],response["isAdmin"],response["canCreateStream"],
    response["allowedStreams"],response["allowedInsertStreams"],response["allStreamsAllowed"],response["canInsertAll"])
    print(response)
    return make_response(response,200)

@app.route('/delete_user', methods=['POST'])
def deleteUser():
    response=json.loads(request.data)
    um.deleteUser(response)
    return{}

@app.route('/exists_user', methods =['POST'])
def existsUser():
    response=json.loads(request.data)
    tmp=um.userAlreadyExists(response)
    return make_response(jsonify(tmp),200)




if __name__ == "__main__":
    app.run(port=5002, debug=True) # For starting the backend process
    # helper.testUserPwd()