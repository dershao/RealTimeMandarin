import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
# tensorflow raises warnings when using with numpy version > 1.16

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow.compat.v1 as tf
import numpy as np
import logging

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
                return np.argmax(preds)


@app.route("/classify", methods=["POST"])
def classify():
    input_json = request.get_json(force=True)

    img_grayscale = np.array(input_json['data']['attributes']['grayscale']).reshape(1, 128, 128, 1) / 255

    global model
    pred = model.predict(img_grayscale)

    return jsonify(data=str(pred))


if __name__  == "__main__":
    global model
    model = MlModel()
    model.load_model("./models/characters-ten-v1")
    app.run()





