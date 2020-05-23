import React from 'react';
import {views} from '../constants.js';
import '../main.css';
import TitleBar from "../components/TitleBar";
import axios from 'axios';

function getCharacters() {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/api/characters'
    }).then((res) => {
        return res.data
    });
}

function MainView({setPageView, setCharacters}) {

    return (
        <>
            <div id="page-wrapper">
                <TitleBar />
                <div id="description">Learn how to write mandarin characters with a neural network!</div>
                <div id="button-wrapper">
                    <button id="start-button"
                        onClick={() => {
                            getCharacters()
                                .then((data) => {
                                    setCharacters(data);
                                    setPageView(views.WORD);
                                });
                        }}>
                        Teach me Mandarin
                    </button>
                </div>
            </div>
        </>
    );
}

export default MainView;
