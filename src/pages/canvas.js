import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import '../styles/drags.scss'

const Canvas = () => {

    const rules = [
        'S', 'Po', 'PGs', 'R1', 'N', 'Ba', 'Li', 'R2',
        'A', 'Or', 'PN', 'R3', 'B', 'Me', 'ANS', 'R4',
        'Gn', 'Pog', 'PNS', 'Go', 'Co', 'Pt', 'U1',
        'L1', 'PM', 'U1ap', 'L1ap', 'DC', 'OLp', 'OLa'
    ]

    const [entry, setEntry] = useState(null)

    const getTheEntryLandMark = e => {
        setEntry(() => e.target.innerText)
        console.log(e.target.innerText)
    }

    const [coordinates, setCoordinates] = useState([])

    const pinPoinstOnCanvas = e => {
        const { layerX, layerY } = e.nativeEvent
        setCoordinates(() => {
            return [
                ...coordinates,
                { x: layerX, y: layerY }
            ]
        })
    }

    const canvas = useRef(null)

    const renderCanvas = () => {
        const ctx = canvas.current
        ctx.width = innerWidth
        ctx.height = innerHeight / 1.12
        const c = ctx.getContext('2d')

        // appendSmallCircles(c)
        appendPoints(c)
        draw(c)
    }

    const appendSmallCircles = c => {
        const cir = () => {
            for (let i = 0; i < 500; i++) {
                const x = Math.random() * innerWidth
                const y = Math.random() * innerHeight - 100
                c.beginPath()
                c.arc(x, y, 2, 0, Math.PI * 2, false);
                c.strokeStyle = `#${i}8${i * 8}`
                c.stroke()
            }
        }

        for(let i = 0; i < 100; i++) {
            setTimeout(() => {
                cir()
            }, 100 * i)
        }
    }

    const circles = []

    const appendPoints = c => {
        for (let i = 0; i < coordinates.length; i++) {
            const { x , y } = coordinates[i]
            // let c1 = new Circle(c, x, y)
            // c1.draw()
            circles.push(new Circle(c, x, y))

            if ((i + 1) % 2 == 0) {
                const startPoints = coordinates[i-1]
                let [preX, preY] = [startPoints.x, startPoints.y]
                let l1 = new Line(c, preX, preY, x, y)
                l1.draw()
            }
        }
    }

    // Circle Class
    function Circle(c, x, y) {
        this.x = x
        this.y = y

        this.draw = function() {
            c.beginPath()
            c.arc(x, y, 6, 0, 2*Math.PI, false)
            c.lineWidth = 2
            c.fillStyle = 'red'
            c.fill()
        }
    }

    // Line Class
    function Line(c, preX, preY, x, y) {
        this.preX = preX
        this.preY = preY
        this.x = x
        this.y = y

        this.draw = function() {
            c.moveTo(this.preX, this.preY)
            c.lineTo(this.x, this.y)
            c.strokeStyle = "#669"
            c.stroke()
        }
    }

    let mousePosition
    //track state of mousedown and up
    let isMouseDown

    document.addEventListener('mousemove', move, false)
    document.addEventListener('mousedown', setDraggable, false)
    document.addEventListener('mouseup', setDraggable, false)

    //main draw method
    const draw = c => {
        //clear canvas
        c.clearRect(0, 0, 980, 500)
        drawCircles()
    }

    //draw circles
    const drawCircles = () => {
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
        let rect = ReactDOM.findDOMNode(canvas.current).getBoundingClientRect()
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
    }, [coordinates])

    return (
        <div className="canvas">
            <canvas ref={canvas} onClick={e => pinPoinstOnCanvas(e)}></canvas>
            <div className="calc-head">
                <div className="buttons" onClick={getTheEntryLandMark}>
                    {rules.map(rule => <span key={rule}>{rule}</span>)}
                </div>
            </div>
        </div>
    )
}

export default Canvas