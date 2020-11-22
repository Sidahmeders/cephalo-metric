import React, { useRef, useEffect } from 'react'


const Canvas = ({ coordinates }) => {

    const canvas = useRef(null)

    const renderCanvas = () => {
        const ctx = canvas.current
        ctx.width = innerWidth
        ctx.height = innerHeight / 1.12

        const c = ctx.getContext('2d')

        // appendCircle(c)
        // appendRectAngle(c)
        // appendLine1(c)
        appendLine2(c)
        // appendArc(c)
        appendPoints(c)
    }

    const appendCircle = c => {
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
        c.beginPath()
        c.moveTo(50, 300)
        c.lineTo(300, 100)
        c.lineTo(300, 250)
        c.moveTo(300, 250)
        c.lineTo(100, 300)
        c.strokeStyle = "#00f"
        c.stroke()
    }

    const appendLine2 = c => {
        //* appending a line
        c.beginPath();
        // c.moveTo(230, 460)
        // c.lineTo(800, 300)
        // c.lineTo(300, 250)
        c.moveTo(400, 300)
        c.lineTo(300, 400)
        c.strokeStyle = "#f0f"
        c.lineWidth = 2
        c.stroke()
    }

    const appendPoints = c => {
        const { x, y } = coordinates
        c.beginPath()
        c.arc(x/*x*/, y /*y*/, 2, 0, 2*Math.PI, false);
        c.strokeStyle = '#f12'
        c.lineWidth = 3
        c.stroke()
    }

    // const getClickPostion = obj => {
    //     const curLeft , curTop = 0
    //     if (obj.offsetParent) {
    //         do {
    //             curLeft += obj.offsetLeft
    //             curTop += obj.offsetTop
    //         }
    //     }
    // }

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