from flask import Flask, request
from flask import jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
api = Api(app)
cors = CORS(app) # Adding CORS header
app.config['CORS_HEADERS'] = 'Content-Type' # Adding CORS header

class ChronicleDB(Resource):
    def get(self):
        response = requests.get("http://127.0.0.1:8000/show_right_flank/2")
        return jsonify(response.json())

    def post(self):
        print(request.data)
        response = requests.post("http://127.0.0.1:8000/insert_ordered/2", request.data)
        print("Response from ChronicleDB: " + str(response))
        return {"data": "Posting success?" } 

api.add_resource(ChronicleDB, "/getright")

if __name__ == "__main__":
    app.run(port=5002, debug=True)