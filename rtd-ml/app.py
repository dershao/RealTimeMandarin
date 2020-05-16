import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
# tensorflow raises warnings when using with numpy version > 1.16

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow.compat.v1 as tf
import numpy as np
import logging
import cv2

app = Flask(__name__)
CORS(app)
tf.disable_v2_behavior()

# https://github.com/tensorflow/tensorflow/issues/14356
class MlModel:
    def __init__(self):
        self.graph = tf.get_default_graph()
        self.session = tf.Session()
        self.model = None
    
    def load_model(self, file):
        with self.graph.as_default():
            with self.session.as_default():
                try:
                    self.model = tf.keras.models.load_model(file)
                    logging.info("Successfully loaded model")
                except Exception as e:
                    logging.exception(e)
    
    def predict(self, img):
        with self.graph.as_default():
            with self.session.as_default():
                preds = self.model.predict(img)
                proba = self.model.predict_proba(img)
                return (np.argmax(preds), proba[0])


def convert(rgb):
    """
        For some reason, the HTML canvas image data will have the colour white as value 0 
        and black as value 255 which is different from the dataset.
    """
    if (rgb == 0):
        return 255
    else:
        return 255 - rgb

v_convert = np.vectorize(convert)


def resize_image(img_array, height=128, width=128):
    """
        Resize image with OpenCV library to height and width expected by ML service.

        Args:
            img_array: Array of pixel values
            height: resize height of image
            width: resize width of image
        
        Returns:
            Array of pixel values with desired dimensions
    """

    return cv2.resize(img_array.astype('uint8'), (height, width), interpolation=cv2.INTER_AREA)


@app.route("/classify", methods=["POST"])
def classify():
    input_json = request.get_json(force=True)

    # get the raw pixel values
    data = np.array(input_json['data']['attributes']['image'])

    # get the number of image channels
    channels = input_json['data']['attributes']['channels']

    # calculate the image dimensions (H * W * channels)
    shape = data.shape[0] // channels
    height = width = int(shape ** 0.5)

    img_array = v_convert(data.reshape(height, width, channels))

    img = resize_image(img_array)

    # Currently, we are only concerned with grayscale values
    img = img[:, :, 3:]
    
    img_grayscale = img.reshape(1, 128, 128, 1) / 255

    global model
    pred = model.predict(img_grayscale)

    return jsonify(data=str(pred[0]), proba=str(pred[1]))


if __name__  == "__main__":
    global model
    model = MlModel()
    model.load_model("./models/characters-six-v1")
    app.run()





