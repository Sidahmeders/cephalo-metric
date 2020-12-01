import React from 'react'
import skull from '../images/skull.svgz'
import '../styles/cephalo.scss'
import Canvas from './canvas'


const CalcHead = () => {

    const rules = [
        'S', 'Po', 'PGs', 'R1', 'N', 'Ba', 'Li', 'R2',
        'A', 'Or', 'PN', 'R3', 'B', 'Me', 'ANS', 'R4',
        'Gn', 'Pog', 'PNS', 'Go', 'Co', 'Pt', 'U1',
        'L1', 'PM', 'U1ap', 'L1ap', 'DC', 'OLp', 'OLa'
    ]

    return (
        <div className="calc-head">
            <div className="buttons">
                {rules.map(rule => <span key={rule}>{rule}</span>)}
            </div>
        </div>
    )
}

const Cephalo = () => {

    return (
        <div className="cephalo">
            <Canvas />
            <CalcHead />
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