import json
from pprint import pformat
from flask import Flask, jsonify, request
from config import PORT
from steps import get_step_func

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({'message': 'Welcome to DIP PubSub'})


@app.route("/steps/<entity>/<step_name>/<status>", methods=["POST"])
def step(entity, step_name, status):
    data = json.loads(request.data)
    print(f"Step: {step_name}, payload: {pformat(data)}")

    # Start process for step
    get_step_func(step_name)(data)

    return jsonify({"message": "task dispatched", "task": data})


app.run(port=PORT)
