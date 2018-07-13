import React from 'react'
import { connectViewModel } from 'resolve-redux'

const Rating = ({ users}) => (
    <div className="rating">
        Rating
        {users ? JSON.stringify(users) : null}
    </div>
)

const mapStateToProps = state => {
    return {
        viewModelName: 'users',
        aggregateId: '*',
        users: state.viewModels['users']['*']
    }
}



export default connectViewModel(mapStateToProps)(Rating)
