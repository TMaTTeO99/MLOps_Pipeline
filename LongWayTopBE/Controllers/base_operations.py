from flask import Flask, request, jsonify, current_app
from Service.DataService import csv_to_dataframe, save_dataset
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

    current_app.logger.info(f"Ricevuto file: {file}")

    if file.filename == '':
        return jsonify({"error": "Nessun file selezionato"}), 400

    if not file.filename.endswith('.csv'):
        return jsonify({"error": "Il file deve essere un .csv"}), 400

    response_data, df_cleaned = csv_to_dataframe(file)
    
    if response_data is None:
        return jsonify({"error": "Errore nell'elaborazione del file"}), 500
    
    file_path = save_dataset(df_cleaned, file.filename)
    
    response_data.update({"file_path": file_path})

    return jsonify(response_data), 200
    
    
def get_app():
    return app