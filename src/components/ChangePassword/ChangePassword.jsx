import React, { Component } from 'react'
import './ChangePassword.css'

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      newPassword: '',
      ConformNewPassword: '',
      errText: '',
      err: '',
      flag: false,
      flag1: false,
      flag2: false,
      content: '',
      passborder: '1px solid #737373',
      newpassborder: '1px solid #737373',
      changed: '',
      visible: false
    }
    this.validation = this.validation.bind(this)
  }
  change (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  visible (e) {
    if (e.target.name === 'flag') {
      return (this.setState({ [e.target.name]: !this.state.flag }))
    }
    if (e.target.name === 'flag1') {
      return (this.setState({ [e.target.name]: !this.state.flag1 }))
    }
    if (e.target.name === 'flag2') {
      return (this.setState({ [e.target.name]: !this.state.flag2 }))
    }
  }
  validation () {
    this.setState({ err: '', errText: '', passborder: '1px solid #737373', newpassborder: '1px solid #737373' })
    if (this.state.newPassword && this.state.newPassword !== this.state.ConformNewPassword) {
      this.setState({ errText: 'The password need to be match', newpassborder: '1px solid red' })
      return false
    }
    if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i).test(this.state.newPassword) === false) {
      this.setState({ errText: 'The Password need to be strong', newpassborder: '1px solid red' })
      return false
    }
    var data = (JSON.parse(window.localStorage.getItem('Data')))
    // console.log(JSON.stringify(data))
    // data.Employee = data.Employee.Employee
    var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
    for (var i = 0; i <= data.Employee.length - 1; i++) {
      if (currentUserId === data.Employee[i].EmpId && this.state.password === data.Employee[i].Password) {
        data.Employee[i].Password = this.state.newPassword
        window.localStorage.setItem('Data', JSON.stringify(data))
        console.log('coming inside if loop')
        return true
      }
    } this.setState({ err: 'The password is incorrect', passborder: '1px solid red' })
    return false
  }
  onsubmit () {
    if (this.validation()) {
      document.getElementById('success').style.opacity = 1
      setTimeout(function () { document.getElementById('success').style.opacity = 0 }, 3000)
      this.setState({
        password: '',
        newPassword: '',
        ConformNewPassword: '',
        errText: '',
        err: '',
        flag: false,
        visible: false
        // changed: ''
      })
    }
  }
  render () {
    if(!localStorage.getItem('currentUserId'))
    {
    return(
     window.location.replace('/')
    )
    }
    else{
    return (
      <div className='parent componentContainer'>
        <div id='changePasswordContainer'>
          {/* <div className={'default ' + this.state.visible ? 'fadeIn' : 'fadeOut'} > */}
          <div id='success'>
            <h3 id='changed'>Successfully submitted</h3>
          </div>
          <div className='topic'>
            <h2 id='head'>Create Password</h2>
            <p className='passText'>Create a new password and continue</p>
          </div>
          <div className='passRow'>
            <label htmlFor='password' className='passText'>Current password: </label>
            <span className='inputField' style={{ border: this.state.passborder }}>
              <input type={this.state.flag ? ('text') : ('password')} name='password'
                placeholder='Current Password'
                value={this.state.password} className='passwordText' onChange={this.change.bind(this)} />
              <button name='flag' className='password passText' onClick={this.visible.bind(this)}>
                {this.state.flag ? ('Hide') : ('show')}</button>
            </span>
            <div className='error'>
              {this.state.err}
            </div>
          </div>
          <div className='passRowDivider' />
          <div className='passRow'>
            <label htmlFor='password' className='passText' >New password: </label>
            <span className='inputField' style={{ border: this.state.newpassborder }}>
              <input type={this.state.flag1 ? ('text') : ('password')} name='newPassword'
                placeholder='New Password'
                value={this.state.newPassword} className='passwordText' onChange={this.change.bind(this)} />
              <button name='flag1' className='password passText' onClick={this.visible.bind(this)}>
                {this.state.flag1 ? ('Hide') : ('show')}</button>
            </span>
            <div className='error'>
              {this.state.errText}
            </div>
          </div>
          <div className='passRowDivider' />
          <div className='passRow'>
            <label htmlFor='password' className='passText'>Conform password: </label>
            <span className='inputField' style={{ border: this.state.newpassborder }}>
              <input type={this.state.flag2 ? ('text') : ('password')} name='ConformNewPassword'
                placeholder='Conform Password'
                value={this.state.ConformNewPassword} className='passwordText' onChange={this.change.bind(this)} />
              <button name='flag2' className='password passText' onClick={this.visible.bind(this)}>
                {this.state.flag2 ? ('Hide') : ('show')}</button>
            </span>
            <div className='error'>
              {this.state.errText}
            </div>
          </div>
          <div className='passText topic'>
            <p>
              Note: Password must have atleast one lowercase, uppercase,numeric and special character
            </p>
          </div>
          <div>
            <input type='button' onClick={this.onsubmit.bind(this)} value='Change' className='Passbutton' />
          </div>
        </div>
      </div>
    )
  }
  }
}
export default ChangePassword
