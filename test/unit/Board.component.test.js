import { Board, defineForm, selectWord } from '../../client/components/Board'

describe('Board', () => {
    test('defineForm should return { direction: "oneLetter"}', () => {
        const points = [{x: 0, y: 0}]

        const result = defineForm(points)

        expect(result).toEqual({ angle: 90,  direction: "oneLetter" })
    })

    test('defineForm should return { direction: "positive", angle: 0 }', () => {
        const points = [{x: 0, y: 0}, {x: 1, y: 0}]

        const result = defineForm(points)

        expect(result).toEqual( { direction: "positive", angle: 0 })
    })

     test('defineForm should return { direction: "positive", angle: 45 }', () => {
         const points = [{x: 0, y: 0}, {x: 1, y: 1}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "positive", angle: 45 })
     })

     test('defineForm should return { direction: "positive", angle: 90 }', () => {
         const points = [{x: 0, y: 0}, {x: 0, y: 1}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "positive", angle: 90 })
     })

     test('defineForm should return { direction: "positive", angle: 135 }', () => {
         const points = [{x: 1, y: 0}, {x: 0, y: 1}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "positive", angle: 135 })
     })

     test('defineForm should return { direction: "negative", angle: 0 }', () => {
         const points = [{x: 1, y: 0}, {x: 0, y: 0}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "negative", angle: 0 })
     })

     test('defineForm should return { direction: "negative", angle: 45 }', () => {
         const points = [{x: 1, y: 1}, {x: 0, y: 0}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "negative", angle: 45 })
     })

     test('defineForm should return { direction: "negative", angle: 90 }', () => {
         const points = [{x: 0, y: 1}, {x: 0, y: 0}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "negative", angle: 90 })
     })

     test('defineForm should return { direction: "negative", angle: 135 }', () => {
         const points = [{x: 0, y: 1}, {x: 1, y: 0}]

         const result = defineForm(points)

         expect(result).toEqual({ direction: "negative", angle: 135 })
     })
    
     test('', () => {
        
     })
})