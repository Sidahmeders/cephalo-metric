import React, { useState } from 'react'
import skull from '../images/skull.svgz'
import '../styles/cephalo.scss'
import Canvas from './canvas'


const Cephalo = () => {
    return (
        <div className="cephalo">
            <Canvas/>
            <h2 style={{marginTop: "15vh", color: "#592"}}>@DENTECH</h2>
            <div className="war">
                <img src={skull} alt="skull" style={{
                    position: "absolute", left: "10vw"
                }} />
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    top: 65,
                    left: 0,
                    zIndex: 2
                }}>
                </div>
            </div>
        </div>
    )
}

export default Cephalo