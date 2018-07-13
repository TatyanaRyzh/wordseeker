export default function ScoreCalc2 (words) {
    let score = 0
    for(let i = 0; i < words.length; i++) {
        if(words[i].isMine) {
            score += words[i].coords.length
        }
    }
    return score
}