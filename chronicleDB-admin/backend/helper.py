import chroniclebackend as cb
import json

def testUserPwd():
    user_name = input("Please enter your username\n")
    user_pwd = input("Please enter password for user " + user_name + "\n")
    if (cb.checkPassword(user_name, user_pwd)) :
        print("Here's your token:")
        print(cb.JWTcreateToken(user_name))
    else:
        print("Wrong!!")

def createUsers():
    data = {}
    data["users"] = []
    data["users"].append({
        "username" : "Admin",
        "password" : "1234",
        "isAdmin" : True,
        "canCreateStreams":True,
        "allStreamsAllowed":True,
        "canInsertAll":True
    })

    data["users"].append({
        "username" : "User",
        "password" : "1234",
        "isAdmin" : False,
        "canCreateStreams":False,
        "allStreamsAllowed":False,
        "allowedStreams":[0, 2, 4, 5],
        "canInsertAll":False,
        "allowedInsertStreams": [0, 1, 4]
    })

    with open("users.dat", "w")as outfile:
        json.dump(data, outfile)