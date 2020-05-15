import React from 'react';
import TitleBar from '../components/TitleBar.js';
import {views} from '../constants.js';

function WordsView({setPageView}) {

    return (
        <>
            <div id="page-wrapper">
                <TitleBar />
                /* TODO: build an API that fetches 3 random characters and would be rendered here */
                <div id="button-wrapper">
                    <button id="start-button"
                            onClick={() => {setPageView(views.CANVAS)}}>
                        I'm Ready!
                    </button>
                </div>
            </div>
        </>
    );
}

export default WordsView;
