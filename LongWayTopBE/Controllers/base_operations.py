from flask import Flask, request, jsonify
from Service.DataService import csv_to_dataframe
from flask_cors import CORS


app = Flask(__name__, instance_relative_config=True)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})


@app.route('/')
def home():
    return "Welcome to Flask with Docker!"

@app.route('/api/upload', methods=['POST'])
def upload_file():

    if 'file_csv' not in request.files:
        return jsonify({"error": "Nessun file inviato"}), 400

    file = request.files['file_csv']

    if file.filename == '':
        return jsonify({"error": "Nessun file selezionato"}), 400

    if not file.filename.endswith('.csv'):
        return jsonify({"error": "Il file deve essere un .csv"}), 400

    return jsonify(csv_to_dataframe(file)), 200
    
    
def get_app():
    return app