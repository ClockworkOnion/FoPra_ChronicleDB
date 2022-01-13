#!/usr/bin/env python3
from flask import Flask, request
from flask import jsonify
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
            return jwt.encode(user, key, algorithm="HS256")
    return ""

def JSONread(filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        return data

def checkPassword(user_name, pwd):
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if user["username"] == user_name:
            return True if (user["password"] == pwd) else False
    return False # returns "none" if there is no return

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
            response = make_response()
            return JWTcreateToken(jsonObject["username"])


class showRightFlank(Resource):
    def get(self):
        print("Trying to get right flank from ChronicleDB at localhost:8000/show_right_flank/0 ... ")
        response = requests.get("http://127.0.0.1:8000/show_right_flank/0")
        print("Response from ChronicleDB: "+ str(response))
        return jsonify(response.json())

    def post(self):
        return "Not defined!"

class createStream(Resource):
    def get(self):
        return "Not defined!"

    def post(self):
        print("Trying to create stream...")
        print(request.data)
        response = requests.post("http://127.0.0.1:8000/create_stream", request.data)
        print("Response from ChronicleDB: " + str(response))
        return {"response from ChronicleDB": str(response) } 

api.add_resource(createStream, "/create_stream")

api.add_resource(showRightFlank, "/show_right_flank")
api.add_resource(userLogin, "/user_login")




if __name__ == "__main__":
    app.run(port=5002, debug=True) # For starting the backend process
    # helper.testUserPwd()
    
