import pickle
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the trained model and scaler
model = pickle.load(open('backend/model.pkl', 'rb'))
scaler = pickle.load(open('backend/scaler.pkl', 'rb'))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Preprocess the input data (similar to what you did before training the model)
    age = int(data['age'])
    gender = data['gender']
    gender_encoded = 1 if gender == 'Male' else 0
    salary = int(data['salary'])

    # Scale the input data using the loaded scaler
    scaled_data = scaler.transform([[age, gender_encoded, salary]])

    # Make the prediction using the loaded model
    prediction = model.predict(scaled_data)

    # Perform any necessary post-processing on the prediction
    prediction = prediction.tolist()

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
