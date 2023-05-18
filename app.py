from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.piaoicv.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/save", methods=["POST"])
def introduce_post():
    category_receive = request.form['category_give']
    info_receive = request.form['info_give']
    doc = {
        'category':category_receive,
        'info':info_receive
    }
    db.self.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

@app.route("/show", methods=["GET"])
def introduce_get():
    all_infos = list(db.self.find({},{'_id':False}))
    return jsonify({'result': all_infos})

@app.route("/delete/<info>", methods=["DELETE"])
def introduce_delete():
    db.myteam.delete_one({"_id": introduce_delete})
    return jsonify({'msg': '삭제 완료!'}) 

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)