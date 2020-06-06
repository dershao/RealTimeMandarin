import React, {useState} from 'react';
import axios from 'axios';

import DrawingCanvas from '../components/DrawingCanvas';
import NNCanvas from '../components/NNCanvas';
import CanvasBar from '../components/CanvasBar';
import Curtain from '../components/Curtain';

function CanvasView({characters}) {

    const [prediction, setPrediction] = useState();
    const [level, setLevel] = useState(0);

    function fetchClassifyResults(imgData) {

        axios({
            method: 'post',
            url: 'http://localhost:5000/classify',
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
            setPrediction(res.data.data);
        });
    }

    function toggleCurtain() {
        let curtainClassName = document.getElementById("curtain").className;
        document.getElementById("curtain").className = curtainClassName === "curtain-panel" ? "curtain-panel visible" : "curtain-panel";
    }

    function reset() {
        toggleCurtain();
        setPrediction();
    }


    let correctDiv;
    if (level < 3 && parseInt(prediction) === characters[level].id) {
        correctDiv = <div>Correct</div>;
        setLevel(level + 1);
    }

    return(
        <>
            {level < 3 && <div className="Canvas">
                <Curtain character={characters[level]}/>
                <CanvasBar character={characters[level]} />
                <DrawingCanvas
                    character={characters[level]}
                    fetchClassifyResults={fetchClassifyResults}
                />
                <NNCanvas prediction={prediction} />
                {correctDiv}
                {(()=> {
                    if (correctDiv && level < 2) {
                        setTimeout(() => {
                            reset();
                        }, 1000);
                    }
                })()}
            </div>}
            {level >= 3 && <div>nice you did it</div>}
            </>
    );
}

export default CanvasView;