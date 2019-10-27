import React from 'react';

class Canvas extends React.Component {

    CANVAS_HEIGHT = 256;
    CANVAS_WIDTH = 256;

    render() {
        return (
            <canvas ref="drawingBoard" width={this.CANVAS_WIDTH} height={this.CANVAS_HEIGHT} border="thick solid #0000FF"/>
        );
    }

    componentDidMount() {
        const drawingBoard = this.refs.drawingBoard;
        const context = drawingBoard.getContext("2d");
        var paint = false; // if we are currently painting (i.e. user clicked on canvas)
        var previous = null; // previous coordinate

        // to prevent user from spamming draw and overwhelming server, set a global flag
        // and timeout between each server request 
        var drawCooldown = false;

        drawingBoard.addEventListener("mousedown", function(e) {
            
            var mouseX = e.pageX - 1;
            var mouseY = e.pageY - 1;
            
            if (!previous) {
                previous = new Point(mouseX, mouseY)
            }

            paint = true;
        }, false);

        drawingBoard.addEventListener("mousemove", function(e) {
            if (paint) {
                var mouseX = e.pageX;
                var mouseY = e.pageY;
                redraw(context, mouseX, mouseY);
                previous = new Point(mouseX, mouseY);
            }
        });

        drawingBoard.addEventListener("mouseup", function(e) {
            paint = false;
            previous = null;

            if (!drawCooldown) {
                console.log("sending stuff");
                drawCooldown = true;
                
                var xhr = new XMLHttpRequest();
                var rawData = context.getImageData(0, 0, 256, 256);
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

                setTimeout(toggleDrawcoolDown, 2000);
            }
        });

        drawingBoard.addEventListener("mouseleave", function(e) {
            paint = false;
            previous = null;
        });


        function redraw(context, x, y){
            // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
            
            context.strokeStyle = "#000000";
            context.lineJoin = "round";
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(previous.pageX, previous.pageY);
            context.lineTo(x, y);
            context.stroke();
        }

        function toggleDrawcoolDown() {
            drawCooldown = !drawCooldown;
        }
        
        var Point = function(x, y) {
            this.pageX = x;
            this.pageY = y;
        }
    }
}

export default Canvas;