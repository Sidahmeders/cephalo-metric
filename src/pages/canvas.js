import React, { useEffect, useRef } from 'react'


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
        
        class Circle {
            constructor(x, y, cirRef) {
                this.x = x
                this.y = y
                this.r = 8
                this.cirRef = cirRef
            }
            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
                c.fillStyle = 'red'
                c.fill()
            }
        }

        class Line {
            constructor(start, end) {
                this.preX = start[0]
                this.preY = start[1]
                this.x = end[0]
                this.y = end[1]
                this.startCirRef = start[2]
                this.endCirRef = end[2]
            }
            draw() {
                c.moveTo(this.preX, this.preY)
                c.lineTo(this.x, this.y)
                c.lineWidth = 1.5
                c.strokeStyle = "#669"
                c.stroke()
            }
        }

        //add listeners
        document.addEventListener('mousemove', dragPoints)
        document.addEventListener('mousedown', setDraggable)
        document.addEventListener('mouseup', setDraggable)
        document.addEventListener('mouseup', addPoints)

        //make some circles
        let c1 = new Circle(380, 40, 1)
        let c2 = new Circle(80, 40, 2)
        //make lines
        let l1 = new Line([380, 40, 1], [80, 40, 2])
        //make a collection of circles & lines
        let circles = [c1, c2]
        let lines = [l1]
        // keep the start and finsh of the line
        let tempLineValues = []

        //append a new circles && lines to the canvas
        function addPoints(e) {         
            if (isPointSelected) {
                const { layerX, layerY } = e
                circles.push(new Circle(layerX, layerY, circles.length+1))
                //check if we have both (start & finsh) points of the line
                if (tempLineValues.length < 2) {
                    tempLineValues.push([layerX, layerY, circles.length+1])
                }
                if (tempLineValues.length == 2) {
                    console.log(tempLineValues)
                    lines.push(new Line(...tempLineValues))
                    tempLineValues = []
                }
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
            for (let i = lines.length - 1; i >= 0; i--) {
                lines[i].draw()
            }
        }

        //key track of circle focus and focused index
        let focused = {
        key: 0,
        state: false
        }

        function dragPoints(e) {
            if (!isMouseDown) return
            getMousePosition(e)
            //if any circle is focused
            if (focused.state) {
                //get the x and y current postion of the mouse
                let xPos = circles[focused.key].y = mousePosition.x
                let yPos = circles[focused.key].y = mousePosition.y
                //update the x and y coordinates of the circle
                circles[focused.key].x = xPos
                circles[focused.key].y = yPos
                //get the Circle and Line Refrence
                let cRef = circles[focused.key].cirRef
                let ll1 = lines[focused.key].startCirRef
                let ll2 = lines[focused.key].endCirRef
                //chek if the circle refrences the right line endpoint and update it's coordinates accordingly
                if (cRef === ll1) {
                    lines[focused.key].preX = circles[focused.key].x = xPos
                    lines[focused.key].preY = circles[focused.key].y = yPos
                }
                if (cRef === ll2) {
                    lines[focused.key].x = circles[focused.key].y = xPos
                    lines[focused.key].y = circles[focused.key].y = yPos
                }
                draw()
                return
            }
            //no circle currently focused check if circle is hovered
            for (let i = 0; i < circles.length; i++) {
                if (intersects(circles[i])) {
                    circles.moveIndex(i, 0)
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
            return areaX**2 + areaY**2 <= circle.r**2
        }

        // change the dragging-focus between circles
        Array.prototype.moveIndex = function (old_index, new_index) {
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