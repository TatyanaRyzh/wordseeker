import React from 'react'
import { connectViewModel } from 'resolve-redux'

const viewModelName = 'rating';
const aggregateId = 'root';

const Rating = ({ rating }) => (
    <div className="rating">
        Rating
        {rating ? JSON.stringify(rating) : null}
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
