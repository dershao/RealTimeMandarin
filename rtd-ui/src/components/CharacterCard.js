import React from 'react';

function CharacterCard({charId, description}) {

    return (
      <>
          <div className="character-card">
            <img className="card-image" src={`/characters/${charId}.png`} alt={`Cannot find character with id: ${charId}`}/>
            <div className="card-description">{description}</div>
          </div>
      </>
    );
}

export default CharacterCard;