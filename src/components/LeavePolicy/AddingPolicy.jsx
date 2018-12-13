import React, { Component } from 'react';
import LeavePolicy from './LeavePolicy';
import './AddingPolicy.css';
class AddingPolicy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: '',
      Days: '',
      Terms: ''
    }
    this.change = this.change.bind(this)
    this.validation = this.validation.bind(this)
  }

  change (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /* --------Validation part is done for adding a new policy -------- */

  validation () {
    if (
      this.state.Name === '' &&
      this.state.Days === '' &&
      this.state.Terms === ''
    ) {
      this.setState({})
      alert("Fields can't be left empty")
      return false
    }
    if (!this.state.Name.match(/^[a-zA-Z]+$/i)) {
      this.setState({})

      alert('Please enter the Leave Name')
      return false
    }
    if (!this.state.Days.match(/^[0-9]+$/i)) {
      this.setState({})
      alert('Please enter the Number of days')
      return false
    }
    if (!this.state.Terms.match(/^[#.0-9a-zA-Z\s,-]+$/i)) {
      this.setState({})
      alert('Please enter the Terms')
      return false
    }
    return true
  }

  closeModal (e) {
    this.setState({ open: false })
  }

  /* --------Validation part is done for submitting a new policy -------- */

  submit () {
    if (this.validation()) {
      var data = JSON.parse(localStorage.getItem('Data'))
      var policy = data.leavePolicy
      if (policy) {
        policy[policy.length] = this.state
        window.localStorage.setItem('Data', JSON.stringify(data))
      } else {
        data['LeavePolicy'] = []
        policy[policy.length] = this.state
        window.localStorage.setItem('Data', JSON.stringify(data))
      }
      alert('Successfully submitted')
      window.location.reload()
      return true
    } else {
      this.setState({})
    }
  }

  /* --------UI part for adding a new policy -------- */

  render () {
    return (
      <div className='popUpAdd'>
        <div className='popUpAddName'>
          <label htmlFor='Leave Name'>Leave Name</label>
          <input type='text' name='Name' onChange={this.change} />
        </div>
        <div className='popUpAddDays'>
          <label htmlFor='Day'>Number of Days</label>
          <input type='number' name='Days' onChange={this.change} />
        </div>
        <div className='popUpAddTerms'>
          <label htmlFor='Terms'>Terms</label>
          <input type='text' name='Terms' onChange={this.change} />
        </div>

        <input
          type='button'
          value='Add'
          className='policySubmitButton'
          onClick={this.submit.bind(this)}
        />
      </div>
    )
  }
}

export default AddingPolicy
