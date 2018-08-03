import React from 'react'
import { connect } from 'react-redux' 
import { Helmet } from 'react-helmet'
import uuid from 'uuid/v4'
import Header from './Header.js'
import Rating from './Rating.js'
import Field from './Field.js'
import Chat from './Chat.js'
import Footer from './Footer.js'

class App extends React.PureComponent {
  componentDidMount() {
    if(!this.props.userId) {
      const userId = uuid()
      const username = this.props.username
      
      fetch('/register',
      {
         headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          method: "POST",
          body: JSON.stringify({ userId, username })
      })
      .then(function(res){
        if(res.status === 200) {
          window.location.reload(true);
        } else {
          throw new Error(res)
        }
       })
      .catch(function(res){ console.log(res) })
    }
  }
  render() {
    if(!this.props.userId) {
      return null
    }
    return (
      <div className="main-wrapper">
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/bootstrap.min.css" />
          <link rel="stylesheet" href="/style.css" />
          <title>reSolve Wordseeker</title>
          <meta property="og:url" content="http://wordseeker.tk" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Wordseeker game" />
          <meta property="og:description" content="I've already started playing! Join me and win the game. Let's find out who is the best." />
          <meta property="og:image" content="https://pbs.twimg.com/profile_images/860216933295247360/UTYMOTU__400x400.jpg" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@resolvejs" />
        </Helmet>
    
        <Header />
    
        <div className="main-containers">
          <Rating />
          <Field />
          <Chat />
        </div>
    
        <Footer />
      </div>
    )
  }  
} 

const mapStateToProps = (state) => ({
  userId: state.jwt.userId,
  username: state.user.username
})

export default connect(mapStateToProps)(App)
