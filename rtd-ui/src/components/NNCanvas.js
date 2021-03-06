import React from 'react';

class NNCanvas extends React.Component {

    render() {
        
        const image = this.props.prediction ? `/characters/${this.props.prediction}.png` : null;
        let canvas;
        if (image) {
            canvas = (
                <div height="128" width="128">
                    <img src= {image} alt={`No prediction found: ${image}`}/>
                </div>
            );
        } 

        return (
            <div className="NNCanvas">
                <div className="CanvasComponent">
                    <h3>You are drawing:</h3>
                    {canvas}
                </div>
            </div>
        );
    }
}

export default NNCanvas;