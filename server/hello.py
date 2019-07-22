from flask import Flask
import flask
app = Flask(__name__)

@app.route('/hello')
def hello_world():
    resp = flask.Response("Hello World!")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

