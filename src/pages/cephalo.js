import React from 'react'
import skull from '../images/skull.svgz'
import '../styles/cephalo.scss'
import Canvas from './canvas'


const Cephalo = () => {
    return (
        <div className="cephalo">
            <Canvas/>
            <h2 style={{marginTop: "15vh", color: "#592"}}>@DENTECH</h2>
            <div>
                <img src={skull} alt="skull"/>
            </div>
        </div>
    )
}

export default Cephalo