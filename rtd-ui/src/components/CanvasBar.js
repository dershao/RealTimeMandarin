import React from 'react';

function CanvasBar({character}) {

    return (
        <>
            <div className="CanvasBar">
                <div id="drawingPrompt">Draw: {character.description}</div>
                <div id="clock">
                    {/*TODO: implement a clock*/}
                </div>
            </div>
        </>
    );
}

export default CanvasBar;