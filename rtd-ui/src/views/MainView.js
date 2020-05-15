import React from 'react';
import {views} from '../constants.js';
import '../main.css';
import TitleBar from "../components/TitleBar";

function MainView({setPageView}) {

    return (
        <>
            <div id="page-wrapper">
                <TitleBar />
                <div id="description">Learn how to write mandarin characters with a neural network!</div>
                <div id="button-wrapper">
                    <button id="start-button"
                        onClick={() => {setPageView(views.WORD)}}>
                        Teach me Mandarin
                    </button>
                </div>
            </div>
        </>
    );
}

export default MainView;
