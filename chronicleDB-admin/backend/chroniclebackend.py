#!/usr/bin/env python3
from flask import Flask, request
from flask import jsonify, make_response
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import requests
import jwt, json
import helper

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

# TOKEN METHODEN ################################################################################################

def JWTcreateToken(user_name):
    print("Creating a web token for user " + user_name + " ...")
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if (user["username"] == user_name):
            print("Found user in database:")
            user_as_object = getUserByName(user_name)
            user_for_jwt = {} # JWT.encode expects a "mapping"! (for loop can't be refactored to a method...)
            for field in dir(user_as_object):
                if (not field.startswith("__")):
                    user_for_jwt[str(field)] = getattr(user_as_object, str(field))
            print("Created mapping:" + str(user_for_jwt))

            return jwt.encode(user_for_jwt, SECRET, algorithm="HS256")
    return ""

def JSONread(filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        return data

def getUserByName(user_name):
    user_data = JSONread(USERFILE)
    for u in user_data["users"]:
        if (u["username"] == user_name):
            return user(u["username"],
             u["isAdmin"],
             u["canCreateStreams"],
             u["allStreamsAllowed"],
             (u["allowedStreams"] if (u["allowedStreams"]) else []),
             u["canInsertAll"],
             (u["allowedInsertStreams"] if (u["allowedStreams"]) else []))

def checkPassword(user_name, pwd):
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if user["username"] == user_name:
            return True if (user["password"] == pwd) else False
    return False # returns "none" if there is no return

class user():
    def __init__(self, username, is_admin, can_create_streams, all_streams_allowed, allowed_streams, can_insert_all, allowed_insert_streams):
        self.username = username
        self.isAdmin = is_admin
        self.canCreateStreams = can_create_streams
        self.allStreamsAllowed = all_streams_allowed
        self.allowedStreams = allowed_streams
        self.canInsertAll = can_insert_all
        self.allowedInsertStreams = allowed_insert_streams

class userLogin(Resource):
    def get(self):
        return "Not defined!"
    
    def post(self):
        print("userLogin post request received. Printing request:")
        print(request.data)
        jsonObject = json.loads(request.data)
        print("-----")
        print(jsonObject)
        print(" --- End of request ---")
        if (checkPassword(jsonObject["username"], jsonObject["password"])):
            res_body = JWTcreateToken(jsonObject["username"])
            response = make_response({"token" : res_body}, 200)
            response.headers["Content-Type"] = "json"
            print("Response created:")
            print(response)
            return response

api.add_resource(userLogin, "/user_login")

if __name__ == "__main__":
    app.run(port=5002, debug=True) # For starting the backend process
    # helper.testUserPwd()