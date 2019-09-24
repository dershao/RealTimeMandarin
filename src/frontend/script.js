function init() {
    var drawingBoard = document.getElementById("drawingBoard");
    var context = drawingBoard.getContext("2d");
    var paint = false;
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    
    var previous = null;

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
    });

    drawingBoard.addEventListener("mouseleave", function(e) {
        paint = false;
    });


    function redraw(context, x, y){
        // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(previous.pageX, previous.pageY);
        context.lineTo(x, y)
        context.stroke();
    }
    
    
    var Point = function(x, y) {
        this.pageX = x;
        this.pageY = y;
    }
}

window.onload = init