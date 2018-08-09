const frequency = [
  ['e', 0.119],
  ['t', 0.208],
  ['a', 0.2873],
  ['o', 0.3611],
  ['i', 0.4306],
  ['n', 0.498],
  ['s', 0.5613],
  ['h', 0.6222],
  ['r', 0.6221],
  ['d', 0.7246],
  ['l', 0.7649],
  ['c', 0.7927],
  ['u', 0.8203],
  ['m', 0.8443],
  ['w', 0.8679],
  ['f', 0.8902],
  ['g', 0.9104],
  ['y', 0.9301],
  ['p', 0.9494],
  ['b', 0.9643],
  ['v', 0.9741],
  ['k', 0.9818],
  ['x', 0.9833],
  ['j', 0.9983],
  ['q', 0.9993],
  ['z', 1]
]

const tryInsertToArr = (arr, w, h, coords, route, word) => {
  let y = coords[0]
  let x = coords[1]
  for (let i = 0; i < word.length; i++) {
    if (!(x >= 0 && x < w && y >= 0 && y < h)) return false
    if (arr[y][x] != '' && arr[y][x] != word[i]) return false
    y += route[0]
    x += route[1]
  }
  y = coords[0]
  x = coords[1]
  for (let i = 0; i < word.length; i++) {
    arr[y][x] = word[i]
    y += route[0]
    x += route[1]
  }

  return true
}

const rInt = (max, random) => {
  let rand = random() * max
  rand = Math.floor(rand)
  return rand
}

const defaultBuildArrOptions = {
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
  random: Math.random
}

const buildArr = (
  inputWords,
  {
    w = defaultBuildArrOptions.w,
    h = defaultBuildArrOptions.h,
    directions = defaultBuildArrOptions.directions,
    random = defaultBuildArrOptions.random
  } = defaultBuildArrOptions
) => {
  const words = [...inputWords]

  let arr = new Array(h)
  for (let i = 0; i < h; i++) {
    arr[i] = new Array(w)
    for (let j = 0; j < w; j++) arr[i][j] = ''
  }

  const boundTryInsertToArr = tryInsertToArr.bind(null, arr, w, h)
  const addedWords = []

  for (let i = 0; i < 10000; i++) {
    let StCoords = [rInt(h, random), rInt(w, random)]
    let route = directions[rInt(directions.length, random)]
    let wordNumber = rInt(words.length, random)
    let word = words[wordNumber]
    if (addedWords.length < 15) {
      if (boundTryInsertToArr(StCoords, route, word)) {
        words.splice(wordNumber, 1)
        addedWords.push(word)
      }
    }
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (!arr[i][j]) {
        let r = random()
        for (let k = 0; k < frequency.length; k++) {
          if (r < frequency[k][1]) {
            arr[i][j] = frequency[k][0]
            break
          }
        }
      }
    }
  }

  return {
    square: arr,
    words: addedWords
  }
}

export default buildArr
