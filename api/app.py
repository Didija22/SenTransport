from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

with open("arrets.json", "r") as f:
    arrets = json.load(f)

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)

if __name__ == "__main__":
    app.run(debug=True)