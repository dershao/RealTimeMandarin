import React from 'react';
import axios from 'axios';

import DrawingCanvas from './DrawingCanvas';
import NNCanvas from './NNCanvas';
import {NUM_CLASSES} from './constants';

class Canvas extends React.Component {
    constructor(props) {
        super();

        let randomCharacter = Math.floor(Math.random() * NUM_CLASSES);
        console.log(`Random character ${randomCharacter}`);

        this.state = {
            prediction: null,
            character: randomCharacter
        }

        this.fetchClassifyResults = this.fetchClassifyResults.bind(this);
    }

    fetchClassifyResults(imgData) {

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
            this.setState({
                prediction: res.data.data
            });
        });
    }

    render() {
        return(
            <div className="Canvas">
                <DrawingCanvas 
                    character={this.state.randomCharacter}
                    fetchClassifyResults={this.fetchClassifyResults}
                />
                <NNCanvas prediction={this.state.prediction} />
                {parseInt(this.state.prediction) === this.state.character &&
                    <div>Correct</div>
                }
            </div>
        );
    }
}

export default Canvas;