import React, { useRef, useState } from 'react'
import '../styles/test.scss'

const Test = ()  => {

    const svg = useRef(null)

    let selectedElement, offset, transform = false

    const getMousePosition = e => {
        let currentTransformationMatrix = svg.current.getScreenCTM()
        return {
          x: (e.clientX - currentTransformationMatrix.e) / currentTransformationMatrix.a,
          y: (e.clientY - currentTransformationMatrix.f) / currentTransformationMatrix.d
        }
    }

    const startDrag = e => {
        if (e.target.classList.contains('draggable')) {
            selectedElement = e.target
            offset = getMousePosition(e)

            // // Get all the transforms currently on this element
            // let transforms = selectedElement.transform.baseVal
            // // Ensure the first transform is a translate transform
            // if (transforms.length === 0 ||
            //     transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            //   // Create an transform that translates by (0, 0)
            //   let translate = svg.current.createSVGTransform()
            //   translate.setTranslate(0, 0)
            //   // Add the translation to the front of the transforms list
            //   selectedElement.transform.baseVal.insertItemBefore(translate, 0)
            // }
            // // Get initial translation amount
            // transform = transforms.getItem(0)
            // offset.x -= transform.matrix.e
            // offset.y -= transform.matrix.f

            offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"))
            offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"))
        }
    }

    const drag = e  => {
        if (selectedElement) {
            e.preventDefault()
            let coord = getMousePosition(e)
            // transform.setTranslate(coord.x - offset.x, coord.y - offset.y)
            selectedElement.setAttributeNS(null, "cx", coord.x - offset.x)
            selectedElement.setAttributeNS(null, "cy", coord.y - offset.y)
        }
    }

    const endDrag = e => selectedElement = null

    const [coordinates, setCoordinates] = useState({
        circle1: { cx: 36, cy: 160 },
        circle2: { cx: 80, cy: 40 },
        circle3: { cx: 240, cy: 220 },
        circle4: { cx: 380, cy: 120 },
    })

    const [svgElements, setSvgElements] = useState([
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

    const renderSvg = () => svgElements.map(s => s)

    return (
        <div className="test">
            <h1>Test</h1>
            <svg ref={svg} fill="#ddd" viewBox="0 0 400 240" width="800" height="480" >
               {renderSvg()}
            </svg>
        </div>
    )
}


export default Test