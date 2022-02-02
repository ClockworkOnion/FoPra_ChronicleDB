import json, jwt
from jwt.exceptions import ExpiredSignatureError
from jwt.exceptions import InvalidSignatureError
from operator import truediv
from flask import Flask, request
from flask import jsonify, make_response
from flask_restful import Api, Resource
# import helper

USERFILE = "users.dat"
SECRET = "secretf"

class User():
    def __init__(self, username, is_admin, can_create_streams, all_streams_allowed, allowed_streams, can_insert_all, allowed_insert_streams):
        self.username = username
        self.isAdmin = is_admin
        self.canCreateStreams = can_create_streams
        self.allStreamsAllowed = all_streams_allowed
        self.allowedStreams = allowed_streams
        self.canInsertAll = can_insert_all
        self.allowedInsertStreams = allowed_insert_streams

def JSONread(filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        return data

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

def getUserAsMap(user_name):
    user_data = JSONread(USERFILE)
    for u in user_data["users"]:
        if (u["username"] == user_name):
            return u

def getUserByName(user_name):
    user_data = JSONread(USERFILE)
    for u in user_data["users"]:
        if (u["username"] == user_name):
            return User(u["username"],
             u["isAdmin"],
             u["canCreateStreams"],
             u["allStreamsAllowed"],
             (u["allowedStreams"] if (u["allowedStreams"]) else []),
             u["canInsertAll"],
             (u["allowedInsertStreams"] if (u["allowedStreams"]) else []))

def getUserByToken(token):
    payload = jwt.decode(token, key=SECRET, algorithms=['HS256', ])
    return getUserAsMap(str(payload["username"]))

def userAlreadyExists(user_name):
    user_data=JSONread(USERFILE)
    tmp=False
    for u in user_data["users"]:
        if(u["username"] == user_name):
            tmp=True
            return tmp
    return tmp
                

def checkPassword(user_name, pwd):
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if user["username"] == user_name:
            return True if (user["password"] == pwd) else False
    return False # returns "none" if there is no return

def getUserIds(): 
    user_data = JSONread(USERFILE)
    users_list = []
    for u in user_data["users"]:
        users_list.append(u["username"])
    return users_list

def getAllUsers(): 
    return JSONread(USERFILE)

def registerNewUser(user_name, password, is_admin, can_create_streams, allowed_streams,
 allowed_insert_streams, all_streams_allowed, can_insert_all):
    user_data = JSONread(USERFILE)
    user_data["users"].append({
        "username" : user_name,
        "password" : password,
        "isAdmin" : is_admin,
        "canCreateStreams":can_create_streams,
        "allowedStreams": allowed_streams,
        "allowedInsertStreams": allowed_insert_streams,
        "allStreamsAllowed":all_streams_allowed,
        "canInsertAll": can_insert_all
    })
    writeUserFile(user_data)

def deleteUser(user_name):
    user_data = JSONread(USERFILE)
    for u in user_data["users"]:
        if (u["username"] == user_name):
            user_data["users"].remove(u)
    writeUserFile(user_data)

def overwriteUser(to_overwrite):
    user_data = JSONread(USERFILE)
    for u in user_data["users"]:
        if (u["username"] == to_overwrite["username"]):
            user_data["users"].remove(u)
            user_data["users"].append(to_overwrite)
    writeUserFile(user_data)

def addVisibleStream(user_name: str, stream_number: int):
    u = getUserAsMap(user_name)
    u["allowedStreams"].append(stream_number)
    u["allowedStreams"].sort()
    overwriteUser(u)

def addInsertStream(user_name: str, stream_number: int):
    u = getUserAsMap(user_name)
    u["allowedInsertStreams"].append(stream_number)
    u["allowedInsertStreams"].sort()
    overwriteUser(u)

def setAdminStatus(user_name, status: bool):
    u = getUserAsMap(user_name)
    u["isAdmin"] = status
    overwriteUser(u)

def setSeeAll(user_name, status: bool):
    u = getUserAsMap(user_name)
    u["allStreamsAllowed"] = status
    overwriteUser(u)

def setInsertAll(user_name, status: bool):
    u = getUserAsMap(user_name)
    u["canInsertAll"] = status
    overwriteUser(u)

def writeUserFile(data):
    with open("users.dat", "w")as outfile:
        json.dump(data, outfile)

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

# api.add_resource(userLogin, "/user_login")

def runTests():
    # helper.createUsers()
    u = getUserByName("User")
    print("Before: User allowed streams:" + str(u.allowedStreams) + " insert streams: " + str(u.allowedInsertStreams))
    addVisibleStream("User", 1)
    addInsertStream("User", 2)
    u = getUserByName("User")
    print("After: User allowed streams:" + str(u.allowedStreams) + " insert streams: " + str(u.allowedInsertStreams))

    print("Admin status for user:")
    setAdminStatus("User", True)
    setInsertAll("User", True)
    setSeeAll("User", True)
    u = getUserAsMap("User")
    print(u)

    print("Registering a new user:")
    registerNewUser("hans", "124", False, False, [1, 3], [1], False, False)
    hans = getUserAsMap("hans")
    print(hans)

    print("Getting all users:")
    print(json.dumps(getUserIds()))


if __name__ == "__main__":
    print("Running user management as main")
    runTests()

