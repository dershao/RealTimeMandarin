import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
# tensorflow raises warnings when using with numpy version > 1.16

from flask import Flask
import tensorflow as tf

app = Flask(__name__)


class Model:
    def __init__(self, file):
        self.model = tf.keras.models.load_model(file)

    def classify(self, img):
        return self.model.predict(img)


model = Model("../models/mnist-keras.h5")


@app.route('/hello', methods=['GET'])
def hello():

    return "hey"


@app.route("/classify", methods=["POST"])
def classify():
    return 0


if __name__  == "__main__":

    app.run(debug=True)





