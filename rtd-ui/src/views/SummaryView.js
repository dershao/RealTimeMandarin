import React from 'react';

import SummaryCard from '../components/SummaryCard.js';
import {views} from "../constants";

function SummaryView({setPageView, characters, correct}) {

    const charactersCorrect = characters.map((c, i) => [c, correct[i]]);

    return (
      <>
          <div id="page-wrapper">
              <div id="character-card-wrapper">
                  {charactersCorrect.map((charCorrect) =>
                      <SummaryCard key={charCorrect[0].id} charId={charCorrect[0].id}
                                       description={charCorrect[0].description}
                                       correct={charCorrect[1]}/>
                  )};
              </div>
              <div id="button-wrapper">
                  <button id="back-button"
                          onClick={() => {setPageView(views.MAIN)}}>
                      Go again!
                  </button>
              </div>
          </div>

      </>
    );
}

export default SummaryView;