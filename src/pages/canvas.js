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
        { 'S': false }, { 'A': false }, { 'B': false }, { 'N': false }, //4
        { 'Na': false }, { 'Pog': false }, { 'Me': false }, { 'Gn': false }, //8
        { 'ENA': false }, { 'ENP': false }, { 'Xi': false }, { 'Go': false }, //12
        { 'Ba': false }, { 'Po': false }, { 'Or': false }, { 'Ptm': false }, //16
        { 'Ar': false }, { 'D': false }, { 'Pm': false }, { 'Co': false }, //20
        { 'U1': false }, { 'L1': false }, { 'U1ap': false }, { 'L1ap': false }, //24
        { 'OLp': false }, { 'OLa': false }, { 'PN': false }, { 'DC': false },  //28
        { 'R1': false }, { 'R2': false }, { 'R3': false }, { 'R4': false } //32
    ]


    const getThePointLandMark = e => {
        // set the isPointSelected to true if it's unSelected
        isPointSelected = e.target.classList.contains('unSelected')
        // check if there is a valid-point update the entry
        if (isPointSelected) entryPoint = e.target.innerText
        // replace the class-name to disable the button
        e.target.classList.remove('unSelected')
        e.target.classList.add('selected')
        calculateTheDistanceAndAngle()
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
        ctx.width = innerWidth * .98
        ctx.height = innerHeight * 1.22
        //reference to 2d context
        let c = ctx.getContext("2d")
        
        // Circle class to draw on the canvas
        class Circle {
            // circle props
            constructor(x, y, cirRef) {
                this.x = x
                this.y = y
                this.r = 4
                this.cirRef = cirRef
            }
            // circle drawing method
            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
                c.fillStyle = 'red'
                c.fill()
                c.fillStyle = "white"
                c.font = "bold 16px serif"
                c.textBaseline = "top"
                c.fillText(this.cirRef, this.x, this.y)
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
                    if (key === entryPoint) {
                        circles.push(new Circle(layerX, layerY, entryPoint))
                        rule[entryPoint] = [layerX, layerY]
                    }
                })
                drawCircles()
                isPointSelected = false
                entryPoint = false
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
                // get the reference-entryPoint from the circle
                const ruleRef = circles[focused.key].cirRef
                // update the rules (x,y) coorinates based on the reference-key
                rules.forEach(rule => {
                    let key = Object.keys(rule)[0]
                    if (key === ruleRef) {
                        rule[ruleRef] = [mousePosition.x, mousePosition.y]
                    }
                })
                //get the Circle and Line Reference
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
                calculateTheDistanceAndAngle()
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

    const findTheDistanceBetweenTwoPoints = (x1, y1, x2, y2) => {
        return Math.sqrt(((x2 - x1)**2) + ((y2 - y1)**2))
    }

    const differenceBetweenPoAndGo = (Po_x, Po_y, Go_x, Go_y) => {
        return [Go_x - Po_x, Go_y - Po_y]
    }

    const intersectionOfPFrOntoMA = (S_x, S_y, Gn_x, Gn_y, Po_x, Po_y, Or_x, Or_y) => {
       const d = {
           SGn: { x: Gn_x - S_x, y: Gn_y - S_y },
           PoOr: { x: Or_x - Po_x, y: Or_y - Po_y }
        }

        const SGn_len = Math.sqrt((d.SGn.x**2) + (d.SGn.y**2))
        const PoOr_Len = Math.sqrt((d.PoOr.x**2) + (d.PoOr.y**2))

        const d_SGn = [d.SGn.x / SGn_len, d.SGn.y / SGn_len]
        const d_PoOr = [d.PoOr.x /PoOr_Len, d.PoOr.y / SGn_len]
        
        return [...d_SGn, ...d_PoOr]
    }

    const calculateTheDistanceAndAngle = () => {
        let coordinates = {
            // XiENAPm: { FIXME:
            //     Xi: rules[10].Xi,
            //     ENA: rules[8].ENA,
            //     Pm: rules[18].Pm
            // },
            SNA: { // angle between S-N-A
                S: rules[0].S,
                N: rules[3].N,
                A: rules[1].A
            }, 
            SNB: { // angle between S-N-B
                S: rules[0].S,
                N: rules[3].N,
                B: rules[2].B
            },
            ANB: { // angle between A-N-B
                A: rules[1].A,
                N: rules[3].N,
                B: rules[2].B
            },
            // angle between lines (PFr-MA) = FMA
            PFr: { // line Po-Or
                Po: rules[13].Po,
                Or: rules[14].Or
            },
            MA: { // line Go-Me
                Go: rules[11].Go,
                Me: rules[6].Me
            },
            // angle between lines (PFr-SGn) = axe_y_de_Brodie TODO:
            SGn: { // line S-Gn
                S: rules[0].S,
                Gn: rules[7].Gn
            },
            // angle between BaNa && PtGn = axe facial de Rickette TODO:
            BaNa: { // line Ba-Na
                Ba: rules[12].Ba,
                Na: rules[4].Na
            }, 
            PtGn: { // line Pt-Gn
                // Pt: rules[].Pt, 
                Gn: rules[7].Gn
            },
            // angle between PFr && U1U1ap = I/F TODO:
            U1U1ap: { // line U1-U1ap
                U1: rules[20].U1,
                U1ap: rules[22].U1ap
            },
            // angle between MA && L1L1ap = I/M TODO:
            L1L1ap: { // line L1-L1ap
                L1: rules[21].L1,
                L1ap: rules[23].L1ap
            },
            // distnce bewteen A && NaPog = convenxite TODO:
            NaPog: {
                Na: rules[4].Na,
                Pog: rules[5].Pog
            },
            // distance between (Pt vertical onto PFr) and (ENA vertical onto PFr) TODO:
            // distance between (Pt vertical onto ENAENP) and A TODO:
            ENAENP: {
                ENA: rules[8].ENA,
                ENP: rules[9].ENP
            }
        }

        const FMA_Diff = differenceBetweenPoAndGo(
            coordinates.PFr.Po[0], coordinates.PFr.Po[1],
            coordinates.MA.Go[0], coordinates.MA.Go[1],
        )

        let screenToCartesianCoordinates = {
            // XiENAPm : convertScreenCoordinatesToCartesianPlanePoints( FIXME:
            //     coordinates.XiENAPm.Xi[0], coordinates.XiENAPm.Xi[1], // Origin (x,y)_axes
            //     coordinates.XiENAPm.ENA[0], coordinates.XiENAPm.ENA[1], // Vector-A (x,y)_axes
            //     coordinates.XiENAPm.Pm[0], coordinates.XiENAPm.Pm[1]  // Vector-B (x,y)_axes
            // ),
            SNA: convertScreenCoordinatesToCartesianPlanePoints(
                coordinates.SNA.N[0], coordinates.SNA.N[1], // Origin (x,y)_axes
                coordinates.SNA.S[0], coordinates.SNA.S[1], // Vector-A (x,y)_axes
                coordinates.SNA.A[0], coordinates.SNA.A[1]  // Vector-B (x,y)_axes
            ),
            SNB: convertScreenCoordinatesToCartesianPlanePoints(
                coordinates.SNB.N[0], coordinates.SNB.N[1], // Origin (x,y)_axes
                coordinates.SNB.S[0], coordinates.SNB.S[1], // Vector-A (x,y)_axes
                coordinates.SNB.B[0], coordinates.SNB.B[1]  // Vector-B (x,y)_axes
            ),
            ANB: convertScreenCoordinatesToCartesianPlanePoints(
                coordinates.ANB.N[0], coordinates.ANB.N[1], // Origin (x,y)_axes
                coordinates.ANB.B[0], coordinates.ANB.B[1], // Vector-A (x,y)_axes
                coordinates.ANB.A[0], coordinates.ANB.A[1]  // Vector-B (x,y)_axes
            ),
            FMA: convertScreenCoordinatesToCartesianPlanePoints(
                coordinates.PFr.Po[0], coordinates.PFr.Po[1], // Origin (x,y)_axes
                coordinates.PFr.Or[0], coordinates.PFr.Or[1], // Vector-A (x,y)_axes
                coordinates.MA.Me[0] - (FMA_Diff[0]), coordinates.MA.Me[1] - (FMA_Diff[1]) // Vector-B (x,y)_axes
            )
        }

        let angles = {
            // XiENAPm: findTheAngleBetweenTwoVectors(...screenToCartesianCoordinates.XiENAPm).toFixed(2), FIXME:
            SNA: findTheAngleBetweenTwoVectors(...screenToCartesianCoordinates.SNA).toFixed(2),
            SNB: findTheAngleBetweenTwoVectors(...screenToCartesianCoordinates.SNB).toFixed(2),
            ANB: findTheAngleBetweenTwoVectors(...screenToCartesianCoordinates.ANB).toFixed(2),
            FMA: findTheAngleBetweenTwoVectors(...screenToCartesianCoordinates.FMA).toFixed(2)
        }

        // let distance = findTheDistanceBetweenTwoPoints(
        //     coordinates[0].XiENAPm.S[0], coordinates[0].XiENAPm.S[1], // Vector-A (x,y)_axes
        //     coordinates[0].XiENAPm.B[0], coordinates[0].XiENAPm.B[1]  // Vector-B (x,y)_axes
        // )

        console.log("coordinates", coordinates.PFr, coordinates.SGn)
        // console.log("angle", angles)
        // console.log("distance", distance.toFixed(2))
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