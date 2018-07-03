import React from 'react'
import Score from '../components/Score.js'
import Board from '../components/Board.js'

const Field = () => (
  <div className="field" style={{backgroundColor: "white", width: "50vw", float: "left", marginLeft: "0.625vw", height: "81vh", borderRadius: "10px", padding: "11px"}}>
    <Score />
    <Board />
  </div>
)

export default Field
