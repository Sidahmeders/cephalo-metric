import React, { useEffect, useState }  from 'react'
import skull from '../images/skull.svgz'
import '../styles/cephalo.scss'
import Canvas from './canvas'


const CalcHead = () => {

    const [rules, setRules] = useState([
        'S', 'Po', 'PGs', 'R1', 'N', 'Ba', 'Li', 'R2', 
        'A', 'Or', 'PN', 'R3', 'B', 'Me', 'ANS', 'R4', 
        'Gn', 'Pog', 'PNS', 'Go', 'Co', 'Pt', 'U1', 
        'L1', 'PM', 'U1ap', 'L1ap', 'DC', 'OLp', 'OLa'
    ])

    return (
        <div className="calc-head">
            <div className="buttons">
                {rules.map(rule => <span key={rule}>{rule}</span>)}
            </div>
        </div>
    )
}

const Cephalo = () => {

    const [grid, setGrid] = useState([])

    const gridRender = () => {
        const rows = []
        for(let row = 0; row < 160; row++) {
            const columns = []
            rows.push(columns)
            for(let column = 0; column < 75; column++) {
                columns.push({
                    coordinates: [row, column],
                    isTrue: true
                })
            }
        }
        setGrid(() => rows)
    }

    useEffect(() => {
        gridRender()
    }, [])

    const setGridprops = (e, x, y) => {
        const { layerX, layerY } = e.nativeEvent
        console.log(layerX, layerY, 'layerXy')
        console.log(x, y, "row, col") // row, col
        const newgrid = grid.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
                if (rowIndex == x && colIndex == y) {
                    col.isTrue = col.isTrue ? false : true
                }
                return col
            })
        })
        setGrid(() => newgrid)
    } 

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
                    {grid.map((row, rowIndex)=> {
                        return (
                            <div key={rowIndex}>
                                {row.map((col, colIndex) => (
                                    col.isTrue ? (
                                        <div key={colIndex} className="grid" style={{
                                            width: 8, height: 8,
                                            background: "#0ff3", borderRadius: 20
                                        }}
                                        onClick={e => setGridprops(e, rowIndex, colIndex)}
                                        >
                                        </div>
                                        ) : (
                                            <div key={colIndex} className="grid" style={{
                                                width: 8, height: 8,
                                                background: "#f008", borderRadius: 20
                                            }}
                                            onClick={e => setGridprops(e, rowIndex, colIndex)}
                                            >
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cephalo