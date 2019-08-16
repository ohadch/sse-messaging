import json
from pprint import pprint, pformat

from flask import Flask, jsonify, request
from config import PORT

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({'message': 'Welcome to DIP PubSub'})


@app.route("/steps/<step_name>", methods=["POST"])
def step(step_name):
    data = json.loads(request.data)
    print(f"Step: {step_name}, payload: {pformat(data)}")
    return {"message": "success"}


app.run(port=PORT)
