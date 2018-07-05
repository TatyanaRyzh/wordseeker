import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header.js'
import Rating from './Rating.js'
import Field from './Field.js'
import Chat from './Chat.js'
import Footer from './Footer.js'
import Modal from '../components/Modal.js'

const App = () => (
  <div className="main-wrapper">
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/bootstrap.min.css" />
      <link rel="stylesheet" href="/style.css" />
      <title>reSolve Wordseeker</title>
    </Helmet>

    <Header />
    
    <div className="main-containers">
      <Modal /> 
      <Rating />
      <Field />
      <Chat />
    </div>

      <Footer />
  </div>
)

export default App
