import React from 'react'
import {connect} from 'react-redux'
import {usernameUpdate} from '../actions/userActions'

class Header extends React.PureComponent {
  onInputChange = (event) => {
    this.props.usernameUpdate(event.target.value)
  };

  render() {
    return (
      <div className="header">
      	<img className="logo" src="./resolve-logo.svg" alt="Resolve logo"></img>
        <div className="hello">
          Hello, 
          <input className="input" onChange={this.onInputChange} value={ this.props.username }  maxLength="15"/>!
        </div>
        <a href="http://twitter.com/share?text=Wordseeker Game&url=" title="Share in Twitter" className="share-button" target="_blank">
	        <img className="big-icon" src="./twitter.svg" alt="Share in Twitter"></img>
	        <div className="share-text">Share in Twitter</div>
        </a>
      </div>
    )
  }
}

function mapStateToProps(state){
  const users = state.viewModels.users['*'] || {}
  let username = state.user.username
  if(users[state.jwt.userId] && users[state.jwt.userId].username.length <= 15) {
    username = users[state.jwt.userId].username;
  } 
  return {
    username
  }
}

function mapDispatchToProps(dispatch){
  return{
      usernameUpdate: function (username){
      dispatch(usernameUpdate(username))
    }
  }
}
export default connect (mapStateToProps, mapDispatchToProps) (Header)