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

def JWTcreateToken(user_name):
    print("Creating a web token for user " + user_name)
    key = "secret"
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if (user["username"] == user_name):
            print("Found user in database")
            user_as_object = getUserByName(user_name)
            user_for_jwt = {} # JWT.encode expects a "mapping"! 
            for field in dir(user_as_object):
                if (not field.startswith("__")):
                    user_for_jwt[str(field)] = getattr(user_as_object, str(field))
                    print(field + " : " + str(getattr(user_as_object, str(field))))
            print("Created mapping:" + str(user_for_jwt))

            return jwt.encode(user_for_jwt, key, algorithm="HS256")
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
             (u["allowedStreams"] if (u["allowedStreams"]) else [0]),
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
        self.is_admin = is_admin
        self.can_create_streams = can_create_streams
        self.all_streams_allowed = all_streams_allowed
        self.allowed_streams = allowed_streams
        self.can_insert_all = can_insert_all
        self.allowed_insert_streams = allowed_insert_streams


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


# class showRightFlank(Resource):
#     def get(self):
#         print("Trying to get right flank from ChronicleDB at localhost:8000/show_right_flank/0 ... ")
#         response = requests.get("http://127.0.0.1:8000/show_right_flank/0")
#         print("Response from ChronicleDB: "+ str(response))
#         return jsonify(response.json())

#     def post(self):
#         return "Not defined!"

# class createStream(Resource):
#     def get(self):
#         return "Not defined!"

#     def post(self):
#         print("Trying to create stream...")
#         print(request.data)
#         response = requests.post("http://127.0.0.1:8000/create_stream", request.data)
#         print("Response from ChronicleDB: " + str(response))
#         return {"response from ChronicleDB": str(response) } 

# api.add_resource(createStream, "/create_stream")
# api.add_resource(showRightFlank, "/show_right_flank")

api.add_resource(userLogin, "/user_login")

if __name__ == "__main__":
    # app.run(port=5002, debug=True) # For starting the backend process
    helper.testUserPwd()