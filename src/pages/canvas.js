import React, { useEffect, useState, useRef } from 'react'


const Drags = () => {

    //track mouse position on mousemove
    let mousePosition
    //track state of mousedown and up
    let isMouseDown
    // check is the user selected a point
    let isPointSelected = false

    // the cephalo-metric calc-points
    const rules = [
        'S', 'Po', 'PGs', 'R1', 'N', 'Ba', 'Li', 'R2',
        'A', 'Or', 'PN', 'R3', 'B', 'Me', 'ANS', 'R4',
        'Gn', 'Pog', 'PNS', 'Go', 'Co', 'Pt', 'U1',
        'L1', 'PM', 'U1ap', 'L1ap', 'DC', 'OLp', 'OLa'
    ]

    const getTheEntryLandMark = e => isPointSelected = e.target.innerText

    //reference to the canvas element
    const canvas = useRef(null)

    // render the canvas on screen
    const renderCanvas = () => {
        const ctx = canvas.current
        // set the width and height of the canvas
        ctx.width = innerWidth
        ctx.height = innerHeight / 1.12
        //reference to 2d context
        let c = ctx.getContext("2d")
        
        // Circle Class
        function Circle(x, y) {
            this.x = x
            this.y = y
            this.r = 8

            this.draw = function() {
                c.beginPath()
                c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
                c.fillStyle = 'red'
                c.fill()
            }
        }

        //add listeners
        document.addEventListener('mousemove', move)
        document.addEventListener('mousedown', setDraggable)
        document.addEventListener('mouseup', setDraggable)
        document.addEventListener('mouseup', addPoints)

        //make some circles
        let c1 = new Circle(380, 40)
        let c2 = new Circle(80, 40)
        let c3 = new Circle(110, 220)
        let c4 = new Circle(380, 220)

        //make a collection of circles
        let circles = [c1, c2, c3, c4]

        // append a new point to the canvas
        function addPoints(e) {
            console.log('addPoints', isPointSelected)
            if (isPointSelected) {
                const { layerX, layerY } = e
                circles.push(new Circle(layerX, layerY))
                drawCircles()
                isPointSelected = false
            }
        }

        //main draw method
        function draw() {
            //clear canvas
            c.clearRect(0, 0, canvas.current.width, canvas.current.height)
            drawCircles()
        }

        //draw circles
        function drawCircles() {
            for (let i = circles.length - 1; i >= 0; i--) {
                circles[i].draw()
            }
        }

        //key track of circle focus and focused index
        let focused = {
        key: 0,
        state: false
        }

        function move(e) {
            if (!isMouseDown) {
                return
            }
            getMousePosition(e)
            //if any circle is focused
            if (focused.state) {
                circles[focused.key].x = mousePosition.x
                circles[focused.key].y = mousePosition.y
                draw()
                return
            }
            //no circle currently focused check if circle is hovered
            for (let i = 0; i < circles.length; i++) {
                if (intersects(circles[i])) {
                    circles.move(i, 0)
                    focused.state = true
                    break
                }
            }
            draw()
        }

        //set mousedown state
        function setDraggable(e) {
            let t = e.type
            if (t === "mousedown") {
                isMouseDown = true
            } else if (t === "mouseup") {
                isMouseDown = false
                releaseFocus()
            }
        }

        function releaseFocus() {
            focused.state = false
        }

        function getMousePosition(e) {
            let rect = canvas.current.getBoundingClientRect()
            mousePosition = {
                x: Math.round(e.x - rect.left),
                y: Math.round(e.y - rect.top)
            }
        }

        //detects whether the mouse cursor is between x and y relative to the radius specified
        function intersects(circle) {
            // subtract the x, y coordinates from the mouse position to get coordinates
            // for the hotspot location and check against the area of the radius
            let areaX = mousePosition.x - circle.x
            let areaY = mousePosition.y - circle.y
            //return true if x^2 + y^2 <= radius squared.
            return areaX * areaX + areaY * areaY <= circle.r * circle.r
        }

        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                let k = new_index - this.length
                while ((k--) + 1) {
                    this.push(undefined)
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0])
        }
        draw()
    }

    const convertScreenCoordinatesToCartesianPlanePoints = (originX, originY, x1, y1, x2, y2) => {
        const vectorA = [originX - x1, originY - y1]
        const vectorB = [originX - x2, originY - y2]

        return [...vectorA, ...vectorB]
    }

    const findTheAngleBetweenTwoVectors = (Ux, Uy, Vx, Vy) => {
        const UV_dot_Product = (Ux * (Vx)) + (Uy * (Vy))
        const U_magnitude = Math.sqrt(((Ux)**2) + ((Uy)**2))
        const V_magnitude = Math.sqrt(((Vx)**2) + ((Vy)**2))

        const cos_theta = Math.acos(UV_dot_Product/(U_magnitude * V_magnitude))
        const theta = cos_theta * (180 / Math.PI)

        return theta
    }

    useEffect(() => {
        renderCanvas()
    }, [])

    return (
        <div className="canvas">
            <canvas ref={canvas}></canvas>
            <div className="calc-head">
                <div className="buttons">
                    {rules.map(rule => <span onClick={getTheEntryLandMark} key={rule}>{rule}</span>)}
                </div>
            </div>
        </div>
    )
}

export default Drags