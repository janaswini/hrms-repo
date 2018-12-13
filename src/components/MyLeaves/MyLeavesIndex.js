import React, { Component } from 'react'
import MyLeaves from '../MyLeaves/MyLeaves'
import './MyLeaves.css'
class MyLeavesIndex extends Component {
  render () {
    if(!localStorage.getItem('currentUserId'))
    {
    return(
     window.location.replace('/')
    )
    }
    else{
    return (
      <div className='componentContainer absolute'>
        <MyLeaves />
      </div>
    )
  }
  }
}

export default MyLeavesIndex
