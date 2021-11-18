from flask import Flask, request
from flask import jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
api = Api(app)
cors = CORS(app) # Adding CORS header
app.config['CORS_HEADERS'] = 'Content-Type' # Adding CORS header

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
        print(request.data)
        response = requests.post("http://127.0.0.1:8000/create_stream", request.data)
        print("Response from ChronicleDB: " + str(response))
        return {"response": "Posting success?" } 

api.add_resource(createStream, "/create_stream")

if __name__ == "__main__":
    app.run(port=5002, debug=True)