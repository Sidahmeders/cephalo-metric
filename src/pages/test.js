import React, { useEffect, useState } from 'react'
import '../styles/test.scss'

const Test = ()  => {

    let selectedElement = false

    const startDrag = e => {
        const { layerX, layerY } = e.nativeEvent
        if (e.target.classList.contains('draggable')) {
            selectedElement = e.target
            e.preventDefault()
            var dragX = e.clientX
            var dragY = e.clientY
            selectedElement.setAttributeNS(null, "cx", dragX)
            selectedElement.setAttributeNS(null, "cy", dragY)
        }
        console.log(layerX, layerY)
    }

    const drag = e  => {
        if (selectedElement) {
          e.preventDefault()
          let x = parseFloat(selectedElement.getAttributeNS(null, "x"))
          selectedElement.setAttributeNS(null, "x", x + 0.1)
        }
    }

    const endDrag = e => selectedElement = null

    const [coordinates, setCoordinates] = useState({
        circle1: { cx: 36, cy: 160 },
        circle2: { cx: 80, cy: 40 },
        circle3: { cx: 240, cy: 220 },
        circle4: { cx: 380, cy: 120 },
    })

    const [svg, setSvg] = useState([
        <rect key="ex-020-rect" x="10" y="10" width="780" height="460"></rect>,
        <line key="ex-020-line-1" x2="68" x1="68" y2="167" y1="31" stroke="skyblue" ></line>,
        <line key="ex-020-line-2" x2="359" x1="354" y2="26" y1="210" stroke="skyblue"></line>,
        <path key="ex-020-path" d="M68,31C68,167 359,26 354,210" stroke="orange"></path>,
        <circle 
            key="ex-020-p0" 
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag} 
            cx={coordinates.circle1.cx}  
            cy={coordinates.circle1.cy} 
            r="6" transform="translate(32 -129)" 
            fill="red" className="cat1 draggable"></circle>,
        <circle 
            key="ex-020-p1" 
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            cx={coordinates.circle2.cx}  
            cy={coordinates.circle2.cy} 
            r="6" transform="translate(-12 127)" 
            fill="#d66" className="cat2 draggable"></circle>,
        <circle 
            key="ex-020-p2" 
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag} 
            cx={coordinates.circle3.cx}  
            cy={coordinates.circle3.cy} 
            r="6" transform="translate(119 -194)" 
            fill="#d66" className="cat3 draggable"></circle>,
        <circle 
            key="ex-020-p3" 
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag} 
            cx={coordinates.circle4.cx}  
            cy={coordinates.circle4.cy} 
            r="6" transform="translate(-26 90)" 
            fill="red" className="cat4 draggable"></circle>
    ])

    const renderSvg = () => svg.map(s => s)

    useEffect(() => {
        
    }, [])

    return (
        <div className="test">
            <h1>Test</h1>
            <svg fill="#ddd" viewBox="0 0 400 240" width="800" height="480" >
               {renderSvg()}
            </svg>
        </div>
    )
}


export default Test