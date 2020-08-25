import React, {useState} from 'react';
import axios from 'axios';

import DrawingCanvas from '../components/DrawingCanvas';
import NNCanvas from '../components/NNCanvas';
import CanvasBar from '../components/CanvasBar';
import Curtain from '../components/Curtain';
import Timer from '../components/Timer';

import {views} from '../constants.js';
import '../css/canvas.css';

function CanvasView({setPageView, characters, setCorrect}) {

    const [prediction, setPrediction] = useState();
    const [level, setLevel] = useState(0);
    const [correct] = useState(new Array(3));
    const [active, setActive] = useState(false);

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

    function reset() {
        setPrediction();
        setActive(false);
    }

    let correctDiv;
    if (level < 3 && parseInt(prediction) === characters[level].id) {
        correct[level] = true;
        setCorrect(correct);
        correctDiv = <div>Correct</div>;
        setLevel(level + 1);
    }

    return(
        <>
            {level < 3 && <div className="Canvas">
                <Curtain character={characters[level]}
                         isActive={active}
                         setActive={setActive}/>
                <Timer isActive={active} level={level} setLevel={setLevel} reset={reset}/>
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
            {level >= 3 && setPageView(views.SUMMARY)}
        </>
    );
}

export default CanvasView;