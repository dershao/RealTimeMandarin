import React from 'react';
import '../css/curtain.css';

function Curtain({character, isActive, setActive}) {

    let curtainClassName = isActive ? "curtain-panel" : "curtain-panel visible";

    return (
        <>
            <div id="curtain-wrapper">
                <div id="curtain" className={curtainClassName}>
                    <div className="curtain-card">
                        <div className="curtain-text">Draw: {character.description}</div>
                        <button id="button" className="curtain-button" onClick={() => {
                            setActive(true);
                        }}>Let's go</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Curtain;