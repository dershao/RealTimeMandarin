import React from 'react';
import '../css/curtain.css';

function Curtain({character}) {

    return (
        <>
            <div id="curtain-wrapper">
                <div id="curtain" className="curtain-panel visible">
                    <div className="curtain-card">
                        <div className="curtain-text">Draw: {character.description}</div>
                        <button id="button" className="curtain-button" onClick={() => {
                            document.getElementById("curtain").className = "curtain-panel";
                        }}>Let's go</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Curtain;