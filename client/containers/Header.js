import React from 'react'
import {connectViewModel} from 'resolve-redux'
import {usernameUpdate} from '../actions/userActions'

class Header extends React.PureComponent {
  onInputChange = (userId, event) => {
    this.props.usernameUpdate(userId, event.target.value);
  };

  render() {
    if(!this.props.isLoaded) {
      return <div />
    }
    return (
      <div className="header">
      	<img className="logo" src="./resolve-logo.svg" alt="Resolve logo"></img>
        <div className="hello">
          Hello, 
          <input className="inputName" type="text" onChange={this.onInputChange.bind(this, this.props.userId)} value={ this.props.username } maxLength="15"/>
        </div>
        <a href="https://twitter.com/intent/tweet?text=https://wordseeker.tk/" title="Share in Twitter" className="share-button" target="_blank">
          <div className="big-icon"></div>
	        {/*<img className="big-icon" src="./twitter.svg" alt="Share in Twitter"></img>*/}
          {/*<object className="big-icon" type="image/svg+xml" data="./twitter.svg"></object>*/}
          
	        Share in Twitter
        </a>
      </div>
    )
  }
}

const viewModelName = 'users'
const aggregateId = '*'

function mapStateToProps(state){
  const result = {
    viewModelName,
    aggregateId,
    isLoaded: false
  }

  const viewState = state.viewModels[viewModelName][aggregateId]

  if(viewState != null) {
    const userId = state.jwt.userId
    const username = viewState != null && viewState[userId] != null && viewState[userId].username != null
      ? String(viewState[userId].username)
      : 'Unknown'

    Object.assign(result, {
      userId,
      username,
      isLoaded: true
    })
  }


  return result
}

function mapDispatchToProps(dispatch, { aggregateActions }){
  return{
    usernameUpdate: (userId, newUsername) => dispatch(aggregateActions.updateUsername(
      userId, { username: newUsername }
    ))
  }
}
export default connectViewModel(mapStateToProps, mapDispatchToProps)(Header)