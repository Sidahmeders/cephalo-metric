import React, { useEffect, useRef } from 'react'


const Drags = () => {

    // track mouse position on mousemove
    let mousePosition
    // track state of mousedown and up
    let isMouseDown
    // set the the entry-point for our Object
    let entryPoint
    // check is the user selected a point
    let isPointSelected

    // the cephalo-metric calc-points
    const rules = [
        { 'S': false }, { 'Po': false }, { 'PGs': false }, { 'R1': false },
        { 'N': false }, { 'Ba': false }, { 'Li': false }, { 'R2': false },
        { 'A': false }, { 'Or': false }, { 'PN': false }, { 'R3': false },
        { 'B': false }, { 'Me': false }, { 'ANS': false }, { 'R4': false },
        { 'Gn': false }, { 'Pog': false }, { 'PNS': false }, { 'Go': false },
        { 'Co': false }, { 'Pt': false }, { 'U1': false }, { 'L1': false },
        { 'PM': false }, { 'U1ap': false }, { 'L1ap': false }, { 'DC': false },
        { 'OLp': false }, { 'OLa': false }
    ]

    const getThePointLandMark = e => {
        // set the isPointSelected to true if it's unSelected
        isPointSelected = e.target.classList.contains('unSelected')
        // check if there is a valid-point update the entry
        if (isPointSelected) entryPoint = e.target.innerText
        // replace the class-name to disable the button
        e.target.classList.remove('unSelected')
        e.target.classList.add('selected')
    }

    const calcHead = useRef(null)

    // render the cephalo-metric-calculator
    const renderClacHead = () => {
        // create a new div element to replace it with the Refrence
        const calculator = document.createElement('div')
        // add class attribute for styling the css
        calculator.setAttribute('class', 'buttons')
        
        rules.map(rule => {
            // get the key-entry of the objects
            let key = Object.keys(rule)[0]
            //create a new span to be the button element
            let span = document.createElement('span')
            // set the text to be the key-entry
            span.innerText = key
            // add on-click handler
            span.onclick = getThePointLandMark
            // set the class attribute for our button element
            span.setAttribute('class', 'unSelected')
            // append the button to the div element
            calculator.appendChild(span)
        })
        // finally replace the refrence div with our new created-div calculator
        calcHead.current.replaceWith(calculator)
    }

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
        
        // Circle class to draw on the canvas
        class Circle {
            // circle props
            constructor(x, y, cirRef) {
                this.x = x
                this.y = y
                this.r = 7
                this.cirRef = cirRef
            }
            // circle drawing method
            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
                c.fillStyle = 'red'
                c.fill()
            }
        }

        // Line class to draw on the canvas
        // class Line {
        //     // line props
        //     constructor(start, end) {
        //         this.preX = start[0]
        //         this.preY = start[1]
        //         this.x = end[0]
        //         this.y = end[1]
        //         this.startCirRef = start[2]
        //         this.endCirRef = end[2]
        //     }
        //     // line drawing method
        //     draw() {
        //         c.moveTo(this.preX, this.preY)
        //         c.lineTo(this.x, this.y)
        //         c.lineWidth = 1.5
        //         c.strokeStyle = "#669"
        //         c.stroke()
        //     }
        // }

        //add listeners
        document.addEventListener('mousemove', dragPoints)
        document.addEventListener('mousedown', setDraggable)
        document.addEventListener('mouseup', setDraggable)
        document.addEventListener('mouseup', addPoints)

        //make some circles
        // let c1 = new Circle(380, 40, 0)
        // let c2 = new Circle(80, 40, 1)
        //make lines
        // let l1 = new Line([380, 40, 0], [80, 40, 1])
        //make a collection of circles & lines
        let circles = [] //[c1, c2]
        // let lines = [l1]
        // keep the start and finsh of the line
        // let tempLineValues = []

        //append a new circles && lines to the canvas
        function addPoints(e) {  
            // check if the user selected a point from clac-head   
            if (isPointSelected) {
                const { layerX, layerY } = e
                circles.push(new Circle(layerX, layerY, circles.length))
                //check if we have both (start & finsh) points of the line
                // if (tempLineValues.length < 2) {
                //     tempLineValues.push([layerX, layerY, circles.length-1])
                // }
                // if (tempLineValues.length == 2) {
                //     lines.push(new Line(...tempLineValues))
                //     tempLineValues = []
                // }
                rules.forEach(rule => {
                    let key = Object.keys(rule)[0]
                    if (key === entryPoint) rule[entryPoint] = { layerX, layerY }
                })
                drawCircles()
                isPointSelected = false
                entryPoint = false
                console.log(rules)
            }
        }

        //main draw method
        function draw() {
            //clear canvas
            c.clearRect(0, 0, ctx.width, ctx.height)
            drawCircles()
        }

        //draw circles
        function drawCircles() {
            for (let i = circles.length - 1; i >= 0; i--) {
                circles[i].draw()
            }
            // for (let i = lines.length - 1; i >= 0; i--) {
            //     lines[i].draw()
            // }
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
                // let cRef = circles[focused.key].cirRef
                // let lineIndex = Math.floor(cRef/2)
                // let ll1 = lines[lineIndex].startCirRef
                // let ll2 = lines[lineIndex].endCirRef
                //chek if the circle refrences the right line endpoint and update it's coordinates accordingly
                // if (cRef === ll1) {
                //     lines[lineIndex].preX = circles[focused.key].x = xPos
                //     lines[lineIndex].preY = circles[focused.key].y = yPos
                // }
                // if (cRef === ll2) {
                //     lines[lineIndex].x = circles[focused.key].y = xPos
                //     lines[lineIndex].y = circles[focused.key].y = yPos
                // }
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
            let rect = ctx.getBoundingClientRect()
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
        renderClacHead()
    }, [])

    return (
        <div className="canvas">
            <canvas ref={ canvas }></canvas>
            <div className="calc-head">
                <div ref={ calcHead }>
                </div>
            </div>
        </div>
    )
}

export default Drags