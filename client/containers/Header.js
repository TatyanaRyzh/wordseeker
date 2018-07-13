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
        <a href="http://twitter.com/share?text=Wordseeker Game&url=" title="Share in Twitter" className="share-button" target="_blank">
	        <img className="big-icon" src="./twitter.svg" alt="Share in Twitter"></img>
	        <div className="share-text">Share in Twitter</div>
        </a>
        Hello, 
        <input className="input" onChange={this.onInputChange} value={this.props.username }/>!
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    username: state.user.username
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