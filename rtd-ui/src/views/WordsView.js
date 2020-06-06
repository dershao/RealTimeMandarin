import React from 'react';
import TitleBar from '../components/TitleBar.js';
import CharacterCard from '../components/CharacterCard.js';
import {views} from '../constants.js';
import '../css/word.css';

function WordsView({setPageView, characters}) {

    return (
        <>
            <div id="page-wrapper">
                <TitleBar />
                <div id="character-card-wrapper">
                    {characters.map((char) => {
                        return (
                            <CharacterCard key={char.id} charId={char.id} description={char.description}/>
                        );
                    })}
                </div>
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
