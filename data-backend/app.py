import json
import redis
from pprint import pprint, pformat

from flask import Flask, jsonify, request
from config import PORT, REDIS_HOST, REDIS_PORT

app = Flask(__name__)
r = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)


@app.route("/")
def home():
    return jsonify({'message': 'Welcome to DIP PubSub'})


@app.route("/steps/<step_name>", methods=["POST"])
def step(step_name):
    data = json.loads(request.data)
    print(f"Step: {step_name}, payload: {pformat(data)}")
    r.publish("task_success", json.dumps(data))
    return jsonify(data)


app.run(port=PORT)
