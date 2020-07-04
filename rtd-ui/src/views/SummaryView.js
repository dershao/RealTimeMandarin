import React from 'react';

import CharacterCard from '../components/CharacterCard.js';

function SummaryView({setPageView, characters}) {

    return (
      <>
          {characters.map((char) => {
              return (
                  <CharacterCard key={char.id} charId={char.id} description={char.description}/>
              );
          })}
      </>
    );
}

export default SummaryView;