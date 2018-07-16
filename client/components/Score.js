import React from 'react'
import { connect } from 'react-redux'

const viewModelName = 'rating';
const aggregateId = 'root';

const calcScore = words => {
  let score = 0
  for (let i = 0; i < words.length; i++) {
      if(words[i].isMine) {
          score += words[i].coords.length
      }
  }
  return score
}

function getScore(arr, userId){
  for (let i = 0; i < arr.length; i++){
    if (arr[i].userId == userId) return arr[i].score;
  }
  return 0;
}

const Score = ({rating, userId}) => (
  <div className="score">
    <div className="score-component">
      <div className="score-caption">Score</div>

      <div className="score-number">{getScore(rating, userId)}</div>
    </div>

    <div className="underline" />
  </div>
)

const mapStateToProps = state => {
  return {
      viewModelName,
      aggregateId,
      rating: state.viewModels[viewModelName][aggregateId],
      userId: state.jwt.userId,
  }
}


export default connect(mapStateToProps)(Score)
