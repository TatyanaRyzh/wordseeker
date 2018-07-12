import React from 'react'


/*const Letter = ({ value, coords, addFunc }) => {
    return (
        <div className="letter" onClick={(e) => {addFunc(coords)}}>
            {value}
        </div>)
}*/
let isDown = false;
const Letter = ({ value, coords, addFunc }) => {
    

    function down() {
        console.log("down");
        isDown = true;
        addFunc(coords);    
    }

    function over() {
        console.log("over", isDown);
        if (isDown) {
            addFunc(coords); 
        }
    }

    function up() {
        console.log("up");
        isDown = false;
    }

    return (
        <div className="letter" onMouseDown={(e) => down(e)} onMouseUp={(e) => up(e)} onMouseOver={(e) => over(e)}>
            {value}
        </div>)
}

export default Letter