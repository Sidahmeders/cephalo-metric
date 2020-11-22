import React, { useEffect, useState }  from 'react'
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

    const [coordinates, setCoordinates] = useState({
        x: null,
        y: null
    })

    const pinPoinstOnCanvas = e => {
        const { layerX, layerY } = e.nativeEvent
        setCoordinates(() => {
            return {
                x: layerX,
                y: layerY
            }
        })
        console.log('layer-x-y: ', layerX, layerY) // row, col
    }

    // useEffect(() => {
    //     gridRender()
    // }, [])

    const setGridprops = (e, x, y) => {
        const { layerX, layerY } = e.nativeEvent
        console.log('row-col: ', x, y)
        console.log('layer-x-y: ', layerX, layerY) // row, col
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
        <div className="cephalo" onClick={e => pinPoinstOnCanvas(e)} >
            <Canvas coordinates={ coordinates } />
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