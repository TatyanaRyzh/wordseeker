import { connectViewModel } from 'resolve-redux'

import React from 'react'
import Letter from './Letter.js'


const viewModelName = 'board';
const aggregateId = 'root';

const SIZE = 12;
const LETTER_SIZE = 6.1;
const DIMENTION = "vh";


function defineForm(points) {
    let firstX = points[0].x;
    let firstY = points[0].y;

    let direction = "positive";
    let angle = 90;

    if (points.length > 1) {




        let secondX = points[1].x;
        let secondY = points[1].y;

        if (firstX === secondX) {
            direction = firstY < secondY ? "positive" : "negative";
        } else if (firstY === secondY) {
            angle = 0;
            direction = firstX < secondX ? "positive" : "negative";
        } else if ((firstX < secondX) && (firstY < secondY)) {
            angle = 45;
            direction = "positive";
        } else if ((firstX > secondX) && (firstY > secondY)) {
            angle = 45;
            direction = "negative";
        } else if ((firstX > secondX) && (firstY < secondY)) {
            angle = 135;
            direction = "positive";
        } else if ((firstX < secondX) && (firstY > secondY)) {
            angle = 135;
            direction = "negative";
        }
    }


    return { direction: direction, angle: angle };
}

function selectWord(word, index) {
    let points = word.coords;

    if (!points.length) {
        return;
    }

    let form = defineForm(points);
    let angle = form.angle;
    let direction = form.direction;

    let length = points.length;

    let wordWidth = angle === 0 ? LETTER_SIZE * length : LETTER_SIZE;
    let wordHeight = angle === 0 ? LETTER_SIZE : LETTER_SIZE * length;

    let translateX = direction === "positive" ? points[0].x : points[length - 1].x;
    let translateY = direction === "positive" ? points[0].y : points[length - 1].y;

    let marginY = 0;
    let marginX = 0;

    if (angle === 45 || angle === 135) {
        wordWidth = Math.sqrt(Math.pow(LETTER_SIZE, 2) + Math.pow(LETTER_SIZE, 2)) * length;
        wordHeight = LETTER_SIZE;
        marginY = LETTER_SIZE / 2;
        if (angle === 135) {
            marginX = LETTER_SIZE;
        }
    }

    angle = angle === 90 ? 0 : angle;
    translateX = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateX + " - " + marginX + DIMENTION + ")";
    translateY = "calc(" + LETTER_SIZE + DIMENTION + "* " + translateY + " - " + marginY + DIMENTION + ")";

    return (<div className="word" key={index}
        style={{
            pointerEvents: "none",
            position: "absolute",
            width: wordWidth + DIMENTION,
            height: wordHeight + DIMENTION,
            backgroundColor: word.isMine ? "#3c4da9" : "#bebebe",
            borderRadius: "30px",
            opacity: "0.35",
            transformOrigin: "left center",
            transform: "translate(" + translateX + ", " + translateY + ") rotate(" + angle + "deg)"
        }}>
    </div>);
}

let isSelectingProcess = false

let currentLetterX;
let currentLetterY;

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.addProcessCoord = this.addProcessCoord.bind(this);

        this.state = {
            coords: [],
        }
    }

    addProcessCoord(eventType, coords) {
        let array = this.state.coords.slice();

        if (eventType === "down") {
            isSelectingProcess = true;
            array.push({ x: currentLetterX, y: currentLetterY });
            this.setState({ coords: array });
        }
        if (eventType === "over") {

            currentLetterX = coords.x;
            currentLetterY = coords.y;

            if (isSelectingProcess) {

                let horParam = currentLetterX - array[0].x;
                let verParam = currentLetterY - array[0].y;

                if (horParam === 0 && verParam === 0) {
                    //1 letter
                    array = [array[0]];
                } else if (horParam > 0 && verParam === 0) {
                    //hor+
                    array = [array[0]];
                    for (let i = 1; i <= currentLetterX - array[0].x; i++) {
                        array.push({ x: array[0].x + i, y: currentLetterY });
                    }
                    console.log(array)
                } else if (horParam < 0 && verParam === 0) {
                    //hor-
                    array = [array[0]];

                    for (let i = 1; i <= array[0].x - currentLetterX; i++) {
                        array.push({ x: array[0].x - i, y: currentLetterY });
                    }
                } else if (horParam === 0 && verParam > 0) {
                    //ver+
                    array = [array[0]];
                    for (let i = 1; i <= currentLetterY - array[0].y; i++) {
                        array.push({ x: currentLetterX, y: array[0].y + i });
                    }
                    console.log(array)
                } else if (horParam === 0 && verParam < 0) {
                    //ver-
                    array = [array[0]];

                    for (let i = 1; i <= array[0].y - currentLetterY; i++) {
                        array.push({ x: currentLetterX, y: array[0].y - i });
                    }
                } else if (horParam > 0 && verParam > 0) {
                    //45+
                } else if (horParam < 0 && verParam < 0) {
                    //45-
                } else if (horParam < 0 && verParam > 0) {
                    //135+
                } else {
                    //135-
                }

                /*  //Hor +
                  if (currentLetterX > previousX) {
    
                      let length = currentLetterX - points[0].x;
                      points.splice(1, points.length - 2);
                      for (let i = length - 1; i >= 1; i--) {
                          points.splice(1, 0, { x: points[0].x + i, y: points[0].y });
                      }
                      //Ver +
                  } else if (currentLetterY > previousY) {
                      let length = currentLetterY - points[0].y;
                      points.splice(1, points.length - 2);
                      for (let i = length - 1; i >= 1; i--) {
                          points.splice(1, 0, { x: points[0].x, y: points[0].y + i });
                      }
                      //Hor -
                  } else if (currentLetterX < previousX) {
                      if ((points.length > 3) && (currentLetterX === points[points.length - 3].x)) {
                          points.splice(-2, 2);
                      } else {
                          length = points[0].x - currentLetterX;
                          points.splice(1, points.length - 2);
                          for (let i = length - 1; i >= 1; i--) {
                              points.splice(1, 0, { x: points[0].x - i, y: points[0].y });
                          }
                      }
                      //Ver - 
                  } else if (currentLetterY < previousY) {
                      if ((points.length > 3) && (currentLetterY === points[points.length - 3].y)) {
                          points.splice(-2, 2);
                      } else {
                          let length = points[0].y - currentLetterY;
                          points.splice(1, points.length - 2);
                          for (let i = length - 1; i >= 1; i--) {
                              points.splice(1, 0, { x: points[0].x, y: points[0].y - i });
                          }
                      }
                      //Diag 45 +
                  } else {
                      let length = currentLetterY - points[0].y;
                      points.splice(1, points.length - 2);
                      for (let i = length - 1; i >= 1; i--) {
                          points.splice(1, 0, { x: points[0].x + i, y: points[0].y + i });
                      }
                  }
    
    
    */




                this.setState({ coords: array });
            }
        }
        if (eventType === "up") {
            isSelectingProcess = false;
            this.setState({ coords: [] });
        }








        /*if ((points.length === 2) && (points[0].x === points[1].x) && (points[0].y === points[1].y)) {
            points.splice(1, 1);
        }*/

    }

    render() {
        let props = this.props;

        let board = props.board;
        let selectedWords = props.selectedWords;
        let isLoaded = props.isLoaded;

        if (!isLoaded) {
            return (<div></div>);
        }

        let letters = [];
        let selectedWordsMarkup = [];
        let index = 0;

        if (!Array.isArray(board)) return null;

        for (let cell = 0; cell < SIZE; cell++) {
            for (let row = 0; row < SIZE; row++) {
                letters.push(<Letter
                    key={SIZE * cell + (row + 1)}
                    coords={{ x: row, y: cell }}
                    value={board[cell][row]}
                    addFunc={this.addProcessCoord}
                />);
            }
        }

        for (index; index < selectedWords.length; index++) {
            selectedWordsMarkup.push(selectWord(selectedWords[index], index));
        }

        return (
            <div className="board" onMouseDown={() => { this.addProcessCoord("down") }} onMouseUp={() => { this.addProcessCoord("up") }}>
                {letters}
                {selectedWordsMarkup}
                {selectWord({ isMine: true, coords: this.state.coords }, index)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const result = {
        viewModelName,
        aggregateId,
        isLoaded: false
    }

    const viewState = state.viewModels[viewModelName][aggregateId]
    if (viewState && Array.isArray(viewState.square)) {
        result.board = viewState.square
        result.selectedWords = viewState.selectedWords
        result.allWordsCount = viewState.allWordsCount
        result.isLoaded = true
    }

    return result
}

export default connectViewModel(mapStateToProps)(Board)
