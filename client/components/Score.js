import React from 'react'
import { connect } from 'react-redux'

import calculatingScore from '../../calculating'

const Score = (props) => (
  <div className="score">
    <div className="score-component">
        <div className="score-caption">
            Score
        </div>
        
        <div className="score-number">
            {props.score}
        </div>
    </div>

    <div className="underline"></div>

  </div>
)

function mapStateToProps(state) {
    let selectedWords = [
        { coords: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }], isMine: true }, //hor pos
        { coords: [{ x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 3 }], isMine: false }, // hor neg
        { coords: [{ x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }], isMine: true }, //ver pos
        { coords: [{ x: 9, y: 4 }, { x: 9, y: 3 }, { x: 9, y: 2 }, { x: 9, y: 1 }], isMine: false }, // ver neg
        { coords: [{ x: 6, y: 5 }, { x: 7, y: 6 }, { x: 8, y: 7 }, {x: 9, y: 8}, {x: 10, y: 9}], isMine: true }, //45 pos
        { coords: [{ x: 10, y: 10 }, { x: 9, y: 9 }, { x: 8, y: 8 }], isMine: false }, // 45 neg
        { coords: [{ x: 6, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 7 }, {x: 3, y: 8}, {x: 2, y: 9}], isMine: true }, //135 pos
        { coords: [{ x: 2, y: 8 }, { x: 3, y: 7 }, { x: 4, y: 6 }], isMine: false } // 135 neg
    ]


    return {
        score: calculatingScore(selectedWords)
    }
}

export default connect(mapStateToProps)(Score)