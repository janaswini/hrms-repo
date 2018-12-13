import React, { Component } from 'react'
import './NoMatch.css'
import { Redirect } from 'react-router-dom';

class Footer extends Component {

delay() {
    window.location.replace('/')
}
  render () {
    return (
      <div className='noMatchContainer'>
        <h1>Error: 404 page not found</h1>
        <h1>Redirecting to login page</h1>
        <p id='hiding'>{setTimeout(this.delay, 1000)}</p>
      </div>
    )
  }
}
export default Footer
