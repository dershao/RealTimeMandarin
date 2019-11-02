import React from 'react';

class Canvas extends React.Component {
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
        this.toggleDrawcoolDown = this.toggleDrawcoolDown.bind(this);
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

        //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        
        context.strokeStyle = "#000000";
        context.lineJoin = "round";
        context.lineWidth = 5;

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
        var mouseX = nativeEvent.pageX - 1;
        var mouseY = nativeEvent.pageY - 1;
        
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

        if (!this.drawCooldown) {
            this.drawCooldown = true;
            
            var xhr = new XMLHttpRequest();
            var rawData = this.context.getImageData(0, 0, this.CANVAS_HEIGHT, this.CANVAS_WIDTH);
            var imgData = Array.from(rawData.data);
            var body = {
                data: {
                    type: "image",
                    attributes: {
                        image: imgData,
                        channels: 4
                    }
                }
            };
            xhr.open("POST", "http://localhost:8080/classify");
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function() {

                console.info(xhr.responseText);
            };
            xhr.send(JSON.stringify(body));

            setTimeout(this.toggleDrawcoolDown, 2000);
        }
    }

    onMouseMove({ nativeEvent }) {
        /**
         * Mouse is drawing on canvas.
         * 
         */
        if (this.paint) {
            var mouseX = nativeEvent.pageX;
            var mouseY = nativeEvent.pageY;
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

    componentDidMount() {
        this.canvas.width = this.CANVAS_WIDTH;
        this.canvas.height = this.CANVAS_HEIGHT;
        this.context = this.canvas.getContext("2d");
    }

    render() {
        return (
            <canvas 
                ref={(ref) => (this.canvas = ref)}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.onMouseLeave}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove} 
                border="thick solid #0000FF"/>
        );
    }
}

export default Canvas;