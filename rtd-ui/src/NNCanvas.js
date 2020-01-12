import React from 'react';

class NNCanvas extends React.Component {

    render() {
        
        const image = this.props.prediction ? `/characters/${this.props.prediction}.png` : null;
        let canvas;
        if (image) {
            canvas = (
                <div height="128" width="128">
                    <img src= {image}/>
                </div>
            );
        } 

        return (
            <div className="CanvasComponent">
                <h3>You are drawing:</h3>
                {canvas}
            </div>
        );
    }
}

export default NNCanvas;