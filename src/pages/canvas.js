import React, { useRef, useEffect, useState } from 'react'
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

        console.log(e.target)

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
        // appendLine1(c)
        // appendArc(c)
        appendPoints(c)
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

    const appendArc = c => {
        //* appending Arc
        c.beginPath()
        c.arc(300, 300, 30, 0, Math.PI * 2, false)
        c.strokeStyle = "#007"
        c.stroke()
    }

    const appendLine1 = c => {
        //* appending a line
        c.beginPath();
        c.moveTo(230, 460)
        c.lineTo(800, 300)
        c.lineTo(300, 250)
        c.moveTo(380, 200)
        c.lineTo(350, 500)
        c.strokeStyle = "#00f"
        c.stroke()
    }

    const appendPoints = c => {
        for (let i = 0; i < coordinates.length; i++) {
            const { x , y } = coordinates[i]
            c.beginPath()
            c.arc(x, y, 2, 0, 2*Math.PI, false)
            // c.quadraticCurveTo(230, 200, 250, 120)
            // c.bezierCurveTo(290, -40, 300, 200, 400, 150)
            c.strokeStyle = '#f12'
            c.lineWidth = 3
            c.stroke()

            if ((i + 1) % 2 == 0) {
                const startPoints = coordinates[i-1]
                let [preX, preY] = [startPoints.x, startPoints.y]

                c.moveTo(preX, preY)
                // c.quadraticCurveTo(preX + 30, preY + 30, x + 30, y + 30)
                // c.bezierCurveTo(20, 40, x, y, preX + 20, preY + 20)
                c.lineTo(x, y)
                c.strokeStyle = "#00f"
                c.stroke()

            }
        }
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