import '@babel/polyfill'
import CompareWord (words, word, result)
import Score from '../components/Score.js'

localStorage.setItem('score', '0');

export function ScoreCalc (word, value, result) {
    let value = localStorage.getItem('score');
    if (result == true){
        value = parseInt(value) + word.length;
    }
    localStorage.setItem('score', value);
}