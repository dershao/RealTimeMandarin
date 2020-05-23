import React from 'react';

function CharacterCard({charId, description}) {

    return (
      <>
          <div class="card-description">{description}</div>
          <img class="card-image" src={`/characters/${charId}.png`}/>
      </>
    );
}

export default CharacterCard;