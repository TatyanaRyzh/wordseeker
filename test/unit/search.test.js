import words from '../../words'
import { SearchWord, CompareWord } from '../../search'

test('Search algorithm should return "trim"', ()=>{
    const square = [
        ['i', 'n', 'f', 'o', 'r', 'm', 'a', 't', 'i', 'o', 'n', 'w'],
        ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'r', 'v', 'r', 'x'],
        ['y', 'z', 'r', 'e', 'm', 'o', 't', 'e', 'g', 'i', 'l', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 't', 'm', 'v'],
        ['w', 'x', 'y', 'z', 'a', 'b', 'c', 'e', 'e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f'],
        ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b'],
        ['c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
    ];
    const points = [
        {x:7, y:0}, {x:8, y:1}, {x:9, y:2}, {x:10, y:3}
    ];

    expect(SearchWord(square, points)).toEqual('trim')

})

test('Search algorithm should return "tgtg"', ()=>{
    const square = [
        ['i', 'n', 'f', 'o', 'r', 'm', 'a', 't', 'i', 'o', 'n', 'w'],
        ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'r', 'v', 'r', 'x'],
        ['y', 'z', 'r', 'e', 'm', 'o', 't', 'e', 'g', 'i', 'l', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 't', 'm', 'v'],
        ['w', 'x', 'y', 'z', 'a', 'b', 'c', 'e', 'e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f'],
        ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b'],
        ['c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
    ];
    const points = [
        {x:7, y:1}, {x:8, y:2}, {x:9, y:3}, {x:10, y:4}
    ];

    expect(SearchWord(square, points)).toEqual('tgtg')

})

test('Search algorithm should return "imykwiugseq"', ()=>{
    const square = [
        ['i', 'n', 'f', 'o', 'r', 'm', 'a', 't', 'i', 'o', 'n', 'w'],
        ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'r', 'v', 'r', 'x'],
        ['y', 'z', 'r', 'e', 'm', 'o', 't', 'e', 'g', 'i', 'l', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 't', 'm', 'v'],
        ['w', 'x', 'y', 'z', 'a', 'b', 'c', 'e', 'e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f'],
        ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b'],
        ['c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
    ];
    const points = [
        {x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}, {x:0, y:4}, {x:0, y:5}, {x:0, y:6}, {x:0, y:7}, {x:0, y:8}, {x:0, y:9}, {x:0, y:10}
    ];

    expect(SearchWord(square, points)).toEqual('imykwiugseq')

})

test('Search algorithm should return "information"', ()=>{
    const square = [
        ['i', 'n', 'f', 'o', 'r', 'm', 'a', 't', 'i', 'o', 'n', 'w'],
        ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'r', 'v', 'r', 'x'],
        ['y', 'z', 'r', 'e', 'm', 'o', 't', 'e', 'g', 'i', 'l', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 't', 't', 'm', 'v'],
        ['w', 'x', 'y', 'z', 'a', 'b', 'c', 'e', 'e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f'],
        ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'],
        ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b'],
        ['c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
    ];
    const points = [
        {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0}, {x:5, y:0}, {x:6, y:0}, {x:7, y:0}, {x:8, y:0}, {x:9, y:0}, {x:10, y:0}
    ];

    expect(SearchWord(square, points)).toEqual('information')

})