import React from 'react';
import axios from 'axios';

import DrawingCanvas from '../components/DrawingCanvas';
import NNCanvas from '../components/NNCanvas';
import TitleBar from '../components/TitleBar';
import {NUM_CLASSES} from '../constants';

class CanvasView extends React.Component {
    constructor(props) {
        super();

        let randomCharacter = Math.floor(Math.random() * NUM_CLASSES);
        console.log(`Random character ${randomCharacter}`);

        this.state = {
            prediction: null,
            character: randomCharacter
        };

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
                <TitleBar />
                <DrawingCanvas 
                    character={this.state.character}
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

export default CanvasView;