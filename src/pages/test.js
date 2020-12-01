import React, { useEffect, useRef, useState } from 'react'
import '../styles/test.scss'

const Test = ()  => {

    const svg = useRef(null)

    let selectedCircle, offset

    const getMousePosition = e => {
        let currentTransformationMatrix = svg.current.getScreenCTM()
        return {
          x: (e.clientX - currentTransformationMatrix.e) / currentTransformationMatrix.a,
          y: (e.clientY - currentTransformationMatrix.f) / currentTransformationMatrix.d
        }
    }

    const startDrag = e => {
        if (e.target.classList.contains('draggable')) {
            selectedCircle = e.target
            offset = getMousePosition(e)
            offset.x -= parseFloat(selectedCircle.getAttributeNS(null, "cx"))
            offset.y -= parseFloat(selectedCircle.getAttributeNS(null, "cy"))
        }
    }

    const drag = e  => {
        if (selectedCircle) {
            let coord = getMousePosition(e)
            selectedCircle.setAttributeNS(null, "cx", coord.x - offset.x)
            selectedCircle.setAttributeNS(null, "cy", coord.y - offset.y)
            // `M68,31C68,${167 + coord.y /3} 359,26 354,210`
        }
    }

    const endDrag = e => selectedCircle = null

    return (
        <div className="test">
            <h1>Test</h1>
            <svg ref={svg} fill="#ddd" viewBox="0 0 400 240" width="800" height="480" >
                <rect key="ex-020-rect" x="10" y="10" width="780" height="460"></rect>,
                <line key="ex-020-line-1" x2="68" x1="68" y2="167" y1="31" stroke="skyblue" ></line>,
                <line key="ex-020-line-2" x2="359" x1="354" y2="26" y1="210" stroke="skyblue"></line>,
                <path key="ex-020-path" d="M68,31C68,167 359,26 354,210" stroke="orange"></path>,
                <circle 
                    key="ex-020-p0" 
                    id="circle1"
                    onMouseDown={startDrag}
                    onMouseMove={drag}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag} 
                    cx="36"
                    cy="160"
                    r="6" transform="translate(32 -129)" 
                    fill="red" className="cat1 draggable"></circle>
            </svg>
        </div>
    )
}


export default Test