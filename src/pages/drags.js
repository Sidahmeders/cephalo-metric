import React, { useEffect, useRef } from 'react'


const Drags = () => {

    let mousePosition;
    //track state of mousedown and up
    let isMouseDown;

    //reference to the canvas element
    const canvas = useRef(null)

    // render the canvas on screen
    const renderCanvas = () => {
        //reference to 2d context
        let ctx = canvas.current.getContext("2d");
        
        // Circle Class
        function Circle(x, y, r, fill) {
            this.startingAngle = 0;
            this.endAngle = 2 * Math.PI;
            this.x = x;
            this.y = y;
            this.r = r;
            this.fill = fill;

            this.draw = function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, this.startingAngle, this.endAngle);
                ctx.fillStyle = this.fill;
                ctx.fill();
            }
        }

        //add listeners
        document.addEventListener('mousemove', move, false);
        document.addEventListener('mousedown', setDraggable, false);
        document.addEventListener('mouseup', setDraggable, false);

        //make some circles
        let c1 = new Circle(50, 50, 9, "red");
        let c2 = new Circle(200, 50, 9, "green");
        let c3 = new Circle(350, 50, 9, "blue");
        //make a collection of circles
        let circles = [c1, c2, c3];

        //main draw method
        function draw() {
            //clear canvas
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            drawCircles();
        }

        //draw circles
        function drawCircles() {
            for (let i = circles.length - 1; i >= 0; i--) {
                circles[i].draw();
            }
        }

        //key track of circle focus and focused index
        let focused = {
        key: 0,
        state: false
        }

        function move(e) {
            if (!isMouseDown) {
                return;
            }
            getMousePosition(e);
            //if any circle is focused
            if (focused.state) {
                circles[focused.key].x = mousePosition.x;
                circles[focused.key].y = mousePosition.y;
                draw();
                return;
            }
            //no circle currently focused check if circle is hovered
            for (let i = 0; i < circles.length; i++) {
                if (intersects(circles[i])) {
                    circles.move(i, 0);
                    focused.state = true;
                    break;
                }
            }
            draw();
        }

        //set mousedown state
        function setDraggable(e) {
            let t = e.type;
            if (t === "mousedown") {
                isMouseDown = true;
            } else if (t === "mouseup") {
                isMouseDown = false;
                releaseFocus();
            }
        }

        function releaseFocus() {
            focused.state = false;
        }

        function getMousePosition(e) {
            let rect = canvas.current.getBoundingClientRect();
            mousePosition = {
                x: Math.round(e.x - rect.left),
                y: Math.round(e.y - rect.top)
            }
        }

        //detects whether the mouse cursor is between x and y relative to the radius specified
        function intersects(circle) {
            // subtract the x, y coordinates from the mouse position to get coordinates
            // for the hotspot location and check against the area of the radius
            let areaX = mousePosition.x - circle.x;
            let areaY = mousePosition.y - circle.y;
            //return true if x^2 + y^2 <= radius squared.
            return areaX * areaX + areaY * areaY <= circle.r * circle.r;
        }

        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                let k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        };
        draw();
    }

    useEffect(() => {
        renderCanvas()
    }, [])

    return (
        <div className="drags">
            <canvas ref={canvas} width="800px" height="500px" style={{background: "#ddd"}}></canvas>
        </div>
    )
}

export default Drags