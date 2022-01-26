from asyncore import write
import json, jwt
from math import fabs
from jwt.exceptions import ExpiredSignatureError
from jwt.exceptions import InvalidSignatureError
from operator import truediv
from flask import Flask, request
from flask import jsonify, make_response
from flask_restful import Api, Resource


from usermanagement import SECRET
import usermanagement

def verifyJWT(token):
    try:
        jwt.decode(token, key=SECRET, algorithms=['HS256', ])
    except (ExpiredSignatureError, InvalidSignatureError) as error:
        print("Validation failed!")
        return False
    print("Validation succeeded!")
    return True

def isUserAdmin(token):
    user = usermanagement.getUserByToken(token)
    return bool(user["isAdmin"])

def canUserCreateStreams(token):
    user = usermanagement.getUserByToken(token)
    return bool(user["canCreateStreams"])

def canUserRead(token, streamId):
    user = usermanagement.getUserByToken(token)
    if not user:
        return False
    print("user gefunden!")
    contains = False
    print(user["allowedStreams"])
    for id in user["allowedStreams"]:
        print("for...")
        if id == int(streamId):
            print("gefunden!!!")
            contains = True
    return bool(user["allStreamsAllowed"] or contains)

def canUserWrite(token, streamId):
    user = usermanagement.getUserByToken(token)
    contains = False
    for id in user["allowedInsertStreams"]:
        if id == int(streamId):
            contains = True
    return bool(user["canInsertAll"] or contains)

# def filterStreams(token, chronicleResponse):
#     payload = jwt.decode(token, key=SECRET, algorithms=['HS256', ])
#     print(chronicleResponse)
#     print("first")
#     print(jsonify(chronicleResponse))
#     print("first2")
#     # for stream in jsonify(chronicleResponse):
#     #     print(stream)
#     # return bool(payload["allStreamsAllowed"] or payload["allowedInsertStreams"].contains(streamId))