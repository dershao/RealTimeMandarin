import React, {useState} from 'react';
import '../curtain.css';


function CurtainView() {


    return (
      <>
          <div id="curtain-wrapper">
              <div id="curtain" className="curtain-panel visible">
                <button id="button" onClick={() => {
                    document.getElementById("curtain").className = "curtain-panel";
                }}>Hi</button>
              </div>
          </div>
      </>
    );
}

export default CurtainView;