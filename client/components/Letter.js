import React from 'react'

const Letter = ({ value, coords, addFunc }) => {
    return (
        <div className="letter" onMouseOver={() => { addFunc("over", coords) }}>
            {value}
        </div>)
}

export default Letter
