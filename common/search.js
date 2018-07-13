/*import '@babel/polyfill'*/
import words from './words'

export function SearchWord (square, points) {
    let word = "";
    for (let i = 0; i < points.length; i++) {
        word += square[points[i].y][points[i].x];
    }
    return word;
}

export function CompareWord (words, word) {
    let result = false;
    for (let j = 0; j < words.length; j++) {
        if (word == words[j]) {
            result = true;
            break;
        }
        else {
            result = false;
        }
    }
    return result;
}