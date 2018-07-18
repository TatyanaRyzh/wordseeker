import React from 'react'
import { connectViewModel } from 'resolve-redux'

const viewModelName = 'rating';
const aggregateId = 'root';

function getLetters(userName){
    let arr = userName.split(" ");
    if (arr[1]) return (arr[0][0] + arr[1][0]).toUpperCase();
    return arr[0][0].toUpperCase();
}
function getTopUsers(rating){
    let list = [];
    for (let i = 0; i < rating.length; i++){
        list.push(<div className="participant"><div className="place">{(i+1)}</div><div className="avatar">{getLetters(rating[i].userName)}</div><div className="userName">{rating[i].userName}</div></div>);
    }
    return list;
}

const Rating = ({ rating }) => (
    <div className="rating">
        {() => (getTopUsers(rating))}
        <div className="ratingTitle">Rating</div>
        <div className="participant">
            <div className="place">1</div>
            <div className="avatar">DL</div>
            <div className="userName">Dmitriy Larichev</div>
        </div>
    </div>
)

const mapStateToProps = state => {
    return {
        viewModelName,
        aggregateId,
        rating: state.viewModels[viewModelName][aggregateId]
    }
}

export default connectViewModel(mapStateToProps)(Rating)

/*
{
            const list = [];
            for (let i = 0; i < rating.length; i++){
                list.push(<div className="participant"><div className="place">(i+1)</div><div className="avatar">getLetters(rating[i].userName)</div><div className="userName">rating[i].userName</div></div>);
            }
            return ${list};
        }
*/