import React, { Component } from 'react';
import './EditProfile.css';
export default class EditProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      EmpId: '',
      Address: '',
      ContactNum: ''
    }
    this.change = this.change.bind(this)
    this.validation = this.validation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  change (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /* --------Validation part for editting updated address and contact number -------- */

  validation () {
    if (this.state.Address === '' && this.state.ContactNum === '') {
      this.setState({})
      alert("Fields can't be left empty")
      return false
    }
    if (!this.state.Address.match(/^[#.0-9a-zA-Z\s,-]+$/i)) {
      this.setState({})
      alert('Please enter the updated Address')
      return false
    }
    if (!this.state.ContactNum.match(/^[0-9]+$/i)) {
      this.setState({})
      alert('Please enter the updated Contact Number')
      return false
    }
    return true
  }

  /* --------Submitting part for edited updated address and contact number -------- */

  handleSubmit (event) {
    event.preventDefault()
    if (this.validation()) {
      var data = JSON.parse(window.localStorage.getItem('Data'))
      var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
      var currentUser = JSON.parse(
        window.localStorage.getItem('currentUserName')
      )
      if (data.edittedProfile) {
        this.setState({ EmpId: currentUserId, EmpName: currentUser }, () => {
          data.edittedProfile[data.edittedProfile.length] = this.state
          localStorage.setItem('Data', JSON.stringify(data))
          this.setState({})
        })
        window.location.reload()
      } else {
        data['edittedProfile'] = []
        this.setState({ EmpId: currentUserId, EmpName: currentUser }, () => {
          data.edittedProfile[data.edittedProfile.length] = this.state
          localStorage.setItem('Data', JSON.stringify(data))
          this.calldispatch()
          this.setState({})
        })
        window.location.reload()
      }
    }
  }

  calldispatch () {
    this.setState({
      EmpId: '',
      Address: '',
      ContactNum: ''
    })
  }

  /* --------UI part for editting updated address and contact number -------- */

  render () {
    let empId = JSON.parse(localStorage.getItem('currentUserId'))
    // alert("curreentUserId: " + empId);
    var data = JSON.parse(window.localStorage.getItem('Data'))
    //alert(JSON.stringify(data));
    return (
      <div className='popUpAddProfile'>
        {data.Employee.map(
          (data, i) =>
            data.EmpId === empId ? (
              <div key={i}>
                <div className='profileHeaderPopup'>
                  <h2 className='profileHeaderPopupHeader'>
                    Request for Address and Contact Number change
                  </h2>
                </div>
                <div className='popUpAddress'>
                  <label htmlFor='Address'>Employee Current Address</label>
                  <span> {data.Address}</span>
                </div>
                <div className='popUpAddress'>
                  <label htmlFor='Address'> Employee Updated Address</label>
                  <input
                    type='text'
                    name='Address'
                    onChange={e => this.change(e, i)}
                  />
                </div>
                <div className='popUpAddress'>
                  <label htmlFor='Contact Number'>
                    Employee Current Contact Number
                  </label>
                  <span> {data.ContactNum}</span>
                </div>
                <div className='popUpAddress'>
                  <label htmlFor='Contact Number'>
                    Employee Updated Contact Number
                  </label>
                  <input
                    type='number'
                    name='ContactNum'
                    onChange={e => this.change(e, i)}
                  />
                </div>

                <input
                  type='button'
                  value='Submit'
                  className='profileEditButton'
                  onClick={this.handleSubmit}
                />
              </div>
            ) : (
              ''
            )
        )}
      </div>
    )
  }
}
