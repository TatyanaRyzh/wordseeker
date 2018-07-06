import words from '../../words'
import createBoard from '../../board'

describe('Board', () => {
  const generateRandom = inputSeed => {
    let seed = inputSeed
    return () => {
      seed = Math.pow(seed, 2) % 10000000
      return seed / 10000000
    }
  }

  it('should be generated for 12x12 with any directions', () => {
    const w = 12
    const h = 12
    const directions = [
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]
    const random = generateRandom(1234567)

    const board = createBoard(words, { random, w, h, directions })

    expect(board).toMatchSnapshot()
  })

  it('should be generated for 15x15 with any directions', () => {
    const w = 15
    const h = 15
    const directions = [
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]
    const random = generateRandom(7654321)

    const board = createBoard(words, { random, w, h, directions })

    expect(board).toMatchSnapshot()
  })

  it('should be generated for 10x10 with no diagonal directions', () => {
    const w = 10
    const h = 10
    const directions = [[0, 1], [-1, 1], [-1, 0], [-1, -1]]
    const random = generateRandom(325793)

    const board = createBoard(words, { random, w, h, directions })

    expect(board).toMatchSnapshot()
  })

  it('should be generated for 20x15 with only horizontal directions', () => {
    const w = 20
    const h = 15
    const directions = [[-1, -1], [1, -1]]
    const random = generateRandom(100001)

    const board = createBoard(words, { random, w, h, directions })

    expect(board).toMatchSnapshot()
  })
})
