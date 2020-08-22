import React from 'react';
import CharacterCard from "./CharacterCard";

function SummaryCard({charId, description, correct}) {

    const correctImg = correct ? <img className="correct-img" src={`/correct.png`} alt={`Cannot find correct image`}/>
        : <img className="incorrect-img" src={`/incorrect.png`} alt={`Cannot find incorrect image`}/>;

    return (
        <>
            <div className="summary-card">
                <CharacterCard charId={charId} description={description} />
                {correctImg}
            </div>
        </>
    );
}

export default SummaryCard;