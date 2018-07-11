// import '@babel/polyfill
// localStorage.setItem('score', '0');

// export function ScoreCalc (word, value, result) {
//     let value = localStorage.getItem('score');
//     if (result == true){
//         value = parseInt(value) + word.length;
//     }
//     localStorage.setItem('score', value);
// }

export default function ScoreCalc2(words) {
  let score = 0
  for (let i = 0; i < words.length; i++) {
    if (words[i].isMine) {
      score += words[i].coords.length
    }
  }
  return score
}
