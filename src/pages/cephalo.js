import React from 'react'
import skull from '../images/radioGraph.bmp'
import '../styles/cephalo.scss'
import Canvas from './canvas'


const Cephalo = () => {
    return (
        <div className="cephalo">
            <Canvas/>
            <div className="radio-graph">
                <img src={skull} alt="skull"/>
            </div>
        </div>
    )
}

export default Cephalo