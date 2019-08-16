from flask import Flask, jsonify
from config import PORT

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({'message': 'Welcome to DIP PubSub'})


app.run(port=PORT)
