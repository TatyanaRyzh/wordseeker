/*import '@babel/polyfill'*/
import words from './words'

export function SearchWord (square, points) {
    let word = "";
    for (let i = 0; i < points.length; i++) {
        word += square[points[i].y][points[i].x];
    }
    return word;
}

let confirmedWords = [];
export function CompareWord (words, word) {
    let result = false;
    let isConfirmed = false;
    for (let i = 0; i < confirmedWords.length; i++) {
        if (word === confirmedWords[i]) {
            isConfirmed = true;
        }
    }
    for (let j = 0; j < words.length; j++) {
        if ((word === words[j]) && (!isConfirmed)) {
            result = true;
            confirmedWords.push(word);
            break;
        }
        else {
            result = false;
        }
    }
    return result;
}