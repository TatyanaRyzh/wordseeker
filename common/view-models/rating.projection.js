export default {
    Init: () => ([]),

    SELECT_WORD: (state, { payload: { userId, word } }) => {
      const nextState = [...state]
      let currentUserRating = nextState.find(({ userId: id }) => ( userId === id ))
      if(!currentUserRating) {
        nextState.push({ userId, score: word.length })
      } else {
        currentUserRating.score += word.length
      }
      function sorting(a, b){
        return b.score - a.score;
      }
      nextState.sort(sorting)   

      for(let i = 0; i < nextState.length; i++) {
        nextState[i] = { ...nextState[i] }
      }
      return nextState
    }/*,
    CHECK_TOP10: (state, {payload: { rating, oldRating }}) => {
      let newUsers = [];
      let top10 = rating.slice(0, 10);
      top: for (let i = 0; i < top10.length; i++){
        for(let j = 0; j < oldRating.length; j++){
          if (rating[i].userId == oldRating[j].userId) continue top;
        }
        newUsers.push(rating[i].userId);
      }
      oldRating = rating;
      return newUsers;
    }*/
}