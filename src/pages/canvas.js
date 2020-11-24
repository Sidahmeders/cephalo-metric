import React, { useRef, useEffect } from 'react'


const Canvas = ({ coordinates }) => {

    const canvas = useRef(null)

    const renderCanvas = () => {
        const ctx = canvas.current
        ctx.width = innerWidth
        ctx.height = innerHeight / 1.12

        const c = ctx.getContext('2d')

        // appendSmallCircles(c)
        // appendRectAngle(c)
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

    const appendRectAngle = c => {
        //* appending rect
        c.fillStyle = "#d89"
        c.fillRect(900, 200, 100, 100)
        c.fillStyle = "#99d"
        c.fillRect(500, 100, 90, 90)
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
            c.arc(x, y, 2, 0, 2*Math.PI, false);
            c.strokeStyle = '#f12'
            c.lineWidth = 3
            c.stroke()

            if ((i + 1) % 2 == 0) {
                const startPoints = coordinates[i-1]
                let [preX, preY] = [startPoints.x, startPoints.y]

                c.moveTo(preX, preY)
                c.lineTo(x, y)
                c.strokeStyle = "#00f"
                c.stroke()

                console.log(preX, preY)
                console.log(x, y)
            }
        }


    }

    const convertScreenCoordinatesToCartesianPlane = (tangentX, tangentY, x1, y1, x2, y2) => {
        const vectorA = [tangentX - x1, tangentY - y1]
        const vectorB = [tangentX - x2, tangentY - y2]

        return [...vectorA, ...vectorB]
    }

    const clacAngleBetweenTwoVectors = (Ux, Uy, Vx, Vy) => {
        const UV_dot_Product = (Ux * (Vx)) + (Uy * (Vy))
        const U_magnitude = Math.sqrt(((Ux)**2) + ((Uy)**2))
        const V_magnitude = Math.sqrt(((Vx)**2) + ((Vy)**2))

        const cos_theta = Math.acos (UV_dot_Product/(U_magnitude * V_magnitude))
        const theta = cos_theta * (180 / Math.PI)

        return theta
    }

    useEffect(() => {
        renderCanvas()
    }, [coordinates])

    return (
        <div style={{marginTop: "10vh", position: "absolute", left: 0, zIndex: 1}}>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export default Canvas