from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

client = MongoClient("mongodb+srv://recona97:bT33xD4II3D77nhi@mycluster.e0pg5l4.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    nickname = request.form['nickname']
    comment = request.form['comment']
    
    doc = {
        "nickname":nickname,
        "comment":comment
    }
    
    db.comments.insert_one(doc)
    return jsonify({'msg': "Save Complete"})

@app.route("/guestbook", methods=["GET"])
def guestbook_get():
    comments = list(db.comments.find({},{"_id":False}))
    
    return jsonify({'comments': comments})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)