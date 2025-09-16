import os
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from flask import Flask, request, render_template, redirect, url_for

# Initialize the Flask application
app = Flask(__name__)

# --- Model and Class Names ---

# Path to your trained Keras model
MODEL_PATH = 'trained_Crop_disease_model.keras'
# Load the model
model = tf.keras.models.load_model(MODEL_PATH)

# Define the class names your model was trained on
# This list needs to match the order of the classes from your training notebook
class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# --- Helper Function ---
def model_predict(img_path, model):
    """
    Preprocesses the image and makes a prediction.
    """
    # Load the image with a target size of 256x256
    img = image.load_img(img_path, target_size=(128, 128))

    
    # Convert the image to a numpy array
    img_array = image.img_to_array(img)
    
    # Expand dimensions to create a batch of 1
    img_array = np.expand_dims(img_array, axis=0)
    
    # Make a prediction
    prediction = model.predict(img_array)
    
    return prediction

# --- Flask Routes ---
@app.route('/', methods=['GET'])
def index():
    """Render the main page."""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def upload():
    """Handle image upload and prediction."""
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        # Create an 'uploads' directory if it doesn't exist
        uploads_dir = os.path.join(os.path.dirname(__file__), 'uploads')
        os.makedirs(uploads_dir, exist_ok=True)
        
        # Save the uploaded file temporarily
        filepath = os.path.join(uploads_dir, file.filename)
        file.save(filepath)

        # Get the prediction
        preds = model_predict(filepath, model)
        
        # Get the predicted class name
        predicted_class_index = np.argmax(preds[0])
        predicted_class_name = class_names[predicted_class_index].replace('___', ' - ').replace('_', ' ')
        
        # Clean up the saved file
        os.remove(filepath)
        
        # Render the result on the same page
        return render_template('index.html', prediction=predicted_class_name, filename=file.filename)
    
    return redirect(request.url)

# --- Main ---
if __name__ == '__main__':
    app.run(debug=True)