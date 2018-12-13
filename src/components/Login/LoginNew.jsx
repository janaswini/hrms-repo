import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './LoginNew.css'
import Popup from 'reactjs-popup'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Submit: false,
      email: '',
      password: '',
      error: '',
      login: [],
      currentUserId: '',
      currentUserRole: '',
      currentUserName: '',
      errText: '',
      open: false
    }

    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.dismissError = this.dismissError.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  };

  setCurrentUser (userId, userRole, userName) {
    this.setState({ currentUserId: this.state.currentUserId = userId })
    this.setState({ currentUserRole: this.state.currentUserRole = userRole })
    this.setState({ currentUserName: this.state.currentUserName = userName })
    localStorage.setItem('currentUserId', JSON.stringify(this.state.currentUserId))
    localStorage.setItem('currentUserRole', JSON.stringify(this.state.currentUserRole))
    localStorage.setItem('currentUserName', JSON.stringify(this.state.currentUserName))
  }

  setNew () {
    this.setState({ Submit: this.state.Submit = true })
    var newVar = JSON.parse(localStorage.getItem('Data'))
    newVar = newVar.Employee
    newVar.forEach(index => {
      if (this.state.email === index.EmailId && this.state.password === index.Password) {
        this.setCurrentUser(index.EmpId, index.Role, index.EmpName)
      } else {
        this.setState({ open: true, errText: 'Invalid User' })
      }
    })
  }

  dismissError () {
    this.setState({ error: '' })
  }

  closeModal (e) {
    this.setState({ open: false })
  }

  handleSubmit (evt) {
    evt.preventDefault()

    if (this.state.email === '' && this.state.password === '') {
      this.setState({ open: true })
      this.setState({ errText: 'Enter Email and password' })
    } else if (!this.state.email) {
      this.setState({ open: true, errText: 'Email is required' })
    } else if (!this.state.password) {
      this.setState({ open: true, errText: 'Password is required' })
    } else if (this.state.email && this.state.password) {
      this.setNew(this)
    }
  }

  handleEmailChange (evt) {
    this.setState({
      email: evt.target.value
    })
  };

  handlePassChange (evt) {
    this.setState({
      password: evt.target.value
    })
  }

  render () {
    if (JSON.parse(localStorage.getItem('currentUserId')) !== null) {
      window.location.replace('/dashboard')
    } else {
      return (
        <div className='loginPage'>
          <div className='hrmsLogin'>
            <div className='hrmsHeader'>
              <h1 className='hrms'>HRMS.</h1>
            </div>
            {/* <div className='bodylogin' /> */}

            <div className='text'>
              <div className='human-resource-manag'>
                Human resource management solutions for businesses
              </div>
              <div className='sample-text-lorem-ip' >
              Sample text lorem ipsum nam portitor blandit accumsan. Ut vel dictum sem.
              </div>
              <div className='rectangle '>
                <div className='read-more '>Read more</div>
                <span className='rectangle-5' />
                <div className='path-2'>&#x2192;</div>
              </div>
            </div>
          </div>
          <div className='rectangle-2'>
            <div className='loginHeaderRight'>
              <div className='don-t-have-an-accoun'>
          Don't have an account?
              </div>
              <input type='button' className='sign-up' value='SIGN UP' />
            </div>
            <div className='bg'>
              <div className='sign-in'>
              SIGN IN
              </div>

              <div className='email'>
                <input type='email' placeholder='Email' data-test='email' value={this.state.email} onChange={this.handleEmailChange} />
              </div>
              <hr className='loginHr' />
              <div className='passwordLogin'>

                <input type='password' placeholder='Password' data-test='password' value={this.state.password} onChange={this.handlePassChange} />
              </div>
              <hr className='loginHr' />

              <div className='remember'>

                <label className='container'> Remember
                  <input type='checkbox' />
                  <span class='checkmark' />
                </label>
              </div>
              {/* <div className='remember'>
                <input type='checkbox' className='rectangleRemember' />
                <p> Remember</p>
              </div> */}
              <span className='oval'>
                <i className='rightOval' onClick={this.handleSubmit} />
              </span>

            </div>

          </div>

          <Popup open={this.state.open}>
            <div className='modal'>
              {this.state.errText}
              <a className='close' onClick={e => this.closeModal(e)}>
                      &times;
              </a>

            </div>
          </Popup>

        </div>

      )
    }
  }
}

export default Login
