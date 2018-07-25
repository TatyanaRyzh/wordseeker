
export default {
  buildBoard: (state, { payload: { secretKey, isFunctionalTest } }) => {
    if (secretKey !== 'LKNFo0e59n8t90w3n8ct90aw4nt09wa4n8rx90cn3a9r') {
      throw new Error('Operation not allowed')
    }
    return {
      type: 'BUILD_BOARD',
      payload: buildBoard(words, {
        w: 12,
        h: 12,
        directions: [
          [0, 1],
          [-1, 1],
          [-1, 0],
          [-1, -1],
          [0, -1],
          [1, -1],
          [1, 0],
          [1, 1]
        ],
        random: isFunctionalTest ? fakeRandom : Math.random
      })
    }
  },

  buildBoard: (state, { payload: {  } }) => {
    if (secretKey !== 'LKNFo0e59n8t90w3n8ct90aw4nt09wa4n8rx90cn3a9r') {
      throw new Error('Operation not allowed')
    }
    return {
      type: 'BUILD_BOARD',
      payload: buildBoard(words, {
        w: 12,
        h: 12,
        directions: [
          [0, 1],
          [-1, 1],
          [-1, 0],
          [-1, -1],
          [0, -1],
          [1, -1],
          [1, 0],
          [1, 1]
        ],
        random: isFunctionalTest ? fakeRandom : Math.random
      })
    }
  },
}
