import React from 'react';

class DrawingCanvas extends React.Component {
    // constants
    CANVAS_HEIGHT = 256;
    CANVAS_WIDTH = 256;

    paint = false; // if we are currently painting (i.e. user clicked on canvas)
    previous = null; // previous coordinate
    
    // to prevent user from spamming draw and overwhelming server, set a global flag
    // and timeout between each server request 
    drawCooldown = false;
    
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onTouchStart= this.onTouchStart.bind(this); 
        this.onTouchMove= this.onTouchMove.bind(this);
        this.onTouchEnd= this.onTouchEnd.bind(this);
        this.toggleDrawcoolDown = this.toggleDrawcoolDown.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);    
    }

    Point = function(x, y) {
        /**
         * Creates a Point object.
         * 
         * Point objects are used to indicate a coordinate on the drawing canvas.
         * 
         * @param x X-coordinate
         * @param y Y-coordinate
         * 
         * @return Point object
         */
        return {pageX: x, pageY: y}
    }
    
    toggleDrawcoolDown = function() {
        /**
         * Helper function for toggling drawCooldown variable.
         * 
         */
        this.context = this.canvas.getContext('2d');
        this.drawCooldown = !this.drawCooldown;
    }

    redraw = function(context, x, y) {
        /**
         * Draw on canvas.
         * 
         * @param context The canvas context to draw on.
         * @param x Last X-coordinate that mouse lands on.
         * @param y Last Y-coordinate that mouse lands on.
         * 
         */

        
        context.strokeStyle = "#000000";
        context.lineJoin = "round";
        context.lineWidth = 10;

        context.beginPath();
        context.moveTo(this.previous.pageX, this.previous.pageY);
        context.lineTo(x, y);
        context.stroke();
    }

    onMouseDown({ nativeEvent }) {
        /**
         * Mouse begins drawing on canvas.
         * 
         */
        var mouseX = nativeEvent.clientX - 1 - this.rect.left;
        var mouseY = nativeEvent.clientY - 1 - this.rect.top;
        
        if (!this.previous) {
            this.previous = this.Point(mouseX, mouseY)
        }

        this.paint = true;
    }

    onMouseUp({ nativeEvent }) {
        /**
         * Mouse stops drawing on canvas.
         * 
         */

        this.paint = false;
        this.previous = null;

    }

    onMouseMove({ nativeEvent }) {
        /**
         * Mouse is drawing on canvas.
         * 
         */
        if (this.paint) {
            var mouseX = nativeEvent.clientX - this.rect.left;
            var mouseY = nativeEvent.clientY - this.rect.top;
            this.redraw(this.context, mouseX, mouseY);
            this.previous = this.Point(mouseX, mouseY);
        }
    }

    onMouseLeave({ nativeEvent }) {
        /**
         * Mouse leaves drawing canvas.
         * 
         */
        this.paint = false;
        this.previous = null;
    }

    onTouchStart({ nativeEvent }) {
        /**
         * Touch leaves drawing canvas.
         * 
         */
        var touchX = nativeEvent.targetTouches[0].clientX - 1 - this.rect.left;
        var touchY = nativeEvent.targetTouches[0].clientY - 1 - this.rect.top;
        
        if (!this.previous) {
            this.previous = this.Point(touchX, touchY)
        }

        this.paint = true;
    }

    onTouchMove({ nativeEvent }) {
        /**
         * Touch is drawing on canvas.
         * 
         */
        if (this.paint) {
            var touchX = nativeEvent.targetTouches[0].clientX - 1 - this.rect.left;
            var touchY = nativeEvent.targetTouches[0].clientY - 1 - this.rect.top;
            this.redraw(this.context, touchX, touchY);
            this.previous = this.Point(touchX, touchY);
        }
    }

    onTouchEnd({ nativeEvent }) {
        /**
         * Touch stops drawing on canvas.
         * 
         */
        this.paint = false;
        this.previous = null;

    }

    makeClassifyRequest() {

        this.drawCooldown = true;
            
        if (this.context) {
            this.props.fetchClassifyResults(this.context.getImageData(0, 0, this.CANVAS_HEIGHT, this.CANVAS_WIDTH));
        }
        // this.context = this.canvas.getContext('2d');

        setTimeout(this.toggleDrawcoolDown, 2000);
    }

    onSubmitClick({ nativeEvent}) {

        this.makeClassifyRequest();
    }

    onClearClick({ nativeEvent }) {

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
    }
 
    componentSetup() {
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
        this.context = this.canvas.getContext("2d");
        // get the offset of the drawing canvas from the page
        // needed to paint on the canvas in the correct location
        this.rect = this.canvas.getBoundingClientRect();
    }

    componentDidUpdate() {
        this.componentSetup();
    }

    componentDidMount() {
        this.componentSetup();
    }

    render() {
        return (
            <>
            <div id="drawingCanvasContainer">
                <canvas 
                    className="CanvasComponent"
                    id="drawingCanvas"
                    ref={(ref) => (this.canvas = ref)}
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.onMouseLeave}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onTouchStart={this.onTouchStart} 
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd} />
                <button onClick={this.onSubmitClick}>Submit</button>
                <button onClick={this.onClearClick}>Clear</button>
            </div>
            </>
        );
    }
}

export default DrawingCanvas;