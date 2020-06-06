import React from 'react';
import '../curtain.css';

function Curtain({character}) {

    return (
        <>
            <div id="curtain-wrapper">
                <div id="curtain" className="curtain-panel visible">
                    <button id="button" onClick={() => {
                        document.getElementById("curtain").className = "curtain-panel";
                    }}>Let's go</button>
                </div>
            </div>
        </>
    );
}

export default Curtain;