import React, { Component } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logOut: false,
      display:'hide',
      popUpVisible:false
    }
    this.logOutFunction = this.logOutFunction.bind(this)
    this.display=this.display.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.handleOutsideClick=this.handleOutsideClick.bind(this)
  }

  handleClick(){
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: this.state.popUpVisible=!prevState.popupVisible,
       
    }));
    // console.log(this.state.popUpVisible)
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }
  logOutFunction () {
    window.localStorage.removeItem('currentUserId')
    window.localStorage.removeItem('currentUserName')
    window.localStorage.removeItem('currentUserRole')
    this.setState({ logOut: (this.state.logOut = true) })
  }
  display(){
    console.log('display functions')
    if(this.state.display === 'hide')
    this.setState({display : this.state.display='display'})
    else
    this.setState({display : this.state.display='hide'})
  }

  render () {
    if (this.state.logOut) {
      window.location.assign('/')
    }
    var userName = JSON.parse(window.localStorage.getItem('currentUserName'))
    
    return (
      <div id='headerContainer'>
        <div className='header'>
          <div className='logo'>HRMS.</div>
          <div className='profile-main-outer'>
              <div className='profile-outer'>
                <Link to='/profile' className='profile-outer'>
                <div className='profile-img'>
                  <img src={require('../../Assets/images/profile_icon.png')} />
                </div>
                </Link>
                <div id='downArrow' onClick={this.handleClick}><i class="fa fa-angle-down"></i></div>
              </div>
           
          </div>
        </div>
        
        { this.state.popUpVisible &&
          (<div id='dropdown-content' ref={node => { this.node = node; }}>
          <div>
            <Link to='/changepassword' className='changePass'> Change Password</Link>
          </div>
          <div>
            <input type='button' className='logoutbutton' onClick={this.logOutFunction} value='Logout' />
          </div>
        </div>
        )}

      </div>
    )
  }
}

export default Header
