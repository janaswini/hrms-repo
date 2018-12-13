// import React, { Component } from 'react'
// // import { Redirect } from 'react-router-dom'
// import './Login.css'
// import Popup from 'reactjs-popup'

// class Login extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       Submit: false,
//       email: '',
//       password: '',
//       error: '',
//       login: [],
//       currentUserId: '',
//       currentUserRole: '',
//       currentUserName: '',
//       errText: '',
//       open: false
//     }

//     this.handlePassChange = this.handlePassChange.bind(this)
//     this.handleEmailChange = this.handleEmailChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.dismissError = this.dismissError.bind(this)
//     this.setCurrentUser = this.setCurrentUser.bind(this)
//   };

//   setCurrentUser (userId, userRole, userName) {
//     this.setState({ currentUserId: this.state.currentUserId = userId })
//     this.setState({ currentUserRole: this.state.currentUserRole = userRole })
//     this.setState({ currentUserName: this.state.currentUserName = userName })
//     localStorage.setItem('currentUserId', JSON.stringify(this.state.currentUserId))
//     localStorage.setItem('currentUserRole', JSON.stringify(this.state.currentUserRole))
//     localStorage.setItem('currentUserName', JSON.stringify(this.state.currentUserName))
//   }

//   setNew () {
//     this.setState({ Submit: this.state.Submit = true })
//     var newVar = JSON.parse(localStorage.getItem('Data'))
//     newVar = newVar.Employee
//     newVar.forEach(index => {
//       if (this.state.email === index.EmailId && this.state.password === index.Password) {
//         this.setCurrentUser(index.EmpId, index.Role, index.EmpName)
//       } else {
//         this.setState({ open: true, errText: 'Invalid User' })
//       }
//     })
//   }

//   dismissError () {
//     this.setState({ error: '' })
//   }

//   closeModal (e) {
//     this.setState({ open: false })
//   }

//   handleSubmit (evt) {
//     evt.preventDefault()

//     if (this.state.email === '' && this.state.password === '') {
//       this.setState({ open: true })
//       this.setState({ errText: 'Enter Email and password' })
//     } else if (!this.state.email) {
//       this.setState({ open: true, errText: 'Email is required' })
//     } else if (!this.state.password) {
//       this.setState({ open: true, errText: 'Password is required' })
//     } else if (this.state.email && this.state.password) {
//       this.setNew(this)
//     }
//   }

//   handleEmailChange (evt) {
//     this.setState({
//       email: evt.target.value
//     })
//   };

//   handlePassChange (evt) {
//     this.setState({
//       password: evt.target.value
//     })
//   }

//   render () {
//     if (JSON.parse(localStorage.getItem('currentUserId')) !== null) {
//       window.location.replace('/dashboard')
//     } else {
//       return (
//         <div>
//           <div className='bodylogin' />
//           <div className='headerlogin'>
//             <div><span>tring</span>apps</div>
//           </div>
//           <br />
//           <div className='login'>
//             <form onSubmit={this.handleSubmit}>
//               <input type='email' placeholder='Email' data-test='email' value={this.state.email} onChange={this.handleEmailChange} />
//               <input type='password' placeholder='Password' data-test='password' value={this.state.password} onChange={this.handlePassChange} />
//               <input type='submit' value='Login' data-test='submit' />
//             </form>

//             <Popup open={this.state.open}>
//               <div className='modal'>
//                 <a className='close' onClick={e => this.closeModal(e)}>
//                       &times;
//                 </a>
//                 {this.state.errText}
//               </div>
//             </Popup>
//           </div>
//         </div>
//       )
//     }
//   }
// }

// export default Login
