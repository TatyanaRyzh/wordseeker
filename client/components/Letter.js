import React from 'react'

const Letter = ({ value, points }) => {
    /*let coverElement = (<div></div>);
    
    if (points) {
        //coverElement = (<div style={{width: 4*(points[points.length-1].x - points[0].x + 1) + "vw", height: 6*(points[points.length - 1].y - points[0].y + 1) +"vh", backgroundColor: "red", opacity: "0.2"}}></div>)
        coverElement = (<div style={{width: "4vw", height: "6vh", backgroundColor: "red", opacity: "0.2", position: "fixed"}}></div>)
    }*/

    return (
            <div className="letter" style={{color: "black"}}>
                {value}
            </div>
    )
}

export default Letter