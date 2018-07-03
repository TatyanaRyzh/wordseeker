import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header.js'
import Rating from './Rating.js'
import Field from './Field.js'
import Chat from './Chat.js'
import Footer from './Footer.js'


const App = () => (
  <div className="main-wrapper" style={{backgroundColor: "#3c4da9", minHeight: "100vh"}}>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/bootstrap.min.css" />
      <title>reSolve Wordseeker</title>
    </Helmet>

    <Header />

    <div style={{minHeight: "81vh"}}>
      <Rating />
      <Field />
      <Chat />
    </div>

      <Footer />
  </div>
)

export default App
