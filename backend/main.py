import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from datetime import datetime

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__)) # chat jeep t

app.config["SQLALCHEMY_DATABASE_URI"] = \
    "sqlite:///" + os.path.join(basedir, "database.db")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

@app.route("/")
def hello_world():
    return jsonify({"status": "ok"})

@app.route("/shit", methods = ["POST", "GET"])
def shit():
    return jsonify({"time": f"{datetime.now()}"})

@app.route("/getcomments", methods=["GET"])
def get_comments():
    comments = Comment.query.order_by(Comment.id.desc()).all()

    result = []
    for c in comments:
        result.append({
            "id": c.id,
            "content": c.content
        })

    return jsonify(result), 200

@app.route("/sendcomment", methods = ["POST"])
def sendcomment():
    data = request.get_json() # ?

    if not data:
        return jsonify({"error": "need to send stuff bro"}) , 404
    
    stuff = data.get('comment')

    db.session.add(Comment(content=stuff))
    db.session.commit()

    return jsonify({"status": "stuff done"}) , 200

with app.app_context():
    db.create_all()   # THIS creates the comment table