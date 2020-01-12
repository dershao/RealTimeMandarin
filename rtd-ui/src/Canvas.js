import React from 'react';
import axios from 'axios';

import DrawingCanvas from './DrawingCanvas';
import NNCanvas from './NNCanvas';

class Canvas extends React.Component {
    constructor() {
        super();

        this.state = {
            prediction: null
        }

        this.fetchClassifyResults = this.fetchClassifyResults.bind(this);
    }

    fetchClassifyResults(imgData) {

        console.log("fetching classify requests");

        axios({
            method: 'post',
            url: 'http://localhost:8080/classify',
            data: {
                data: {
                    type: "image",
                    attributes: {
                        image: Array.from(imgData.data),
                        channels: 4
                    }
                }
            }  
        }).then((res) => {
            console.log(`setting state with ${res.data.data}`);
            this.setState({
                prediction: res.data.data
            });
        });
    }

    showPrediction(prediction) {
        
        this.setState({
            prediction: prediction
        });
    }

    render() {
        return(
            <div className="Canvas">
                <DrawingCanvas fetchClassifyResults={this.fetchClassifyResults}/>
                <NNCanvas prediction={this.state.prediction} />
            </div>
        );
    }
}

export default Canvas;