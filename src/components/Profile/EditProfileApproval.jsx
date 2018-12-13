import React, { Component } from 'react'
import './EditProfileApproval.css'
import { NavLink } from 'react-router-dom'

class EditProfileApproval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      EmpId: '',
      EmpName: '',
      ContactNum: '',
      Address: '',
      EditProfile: JSON.parse(localStorage.getItem('Data'))
    }
  }

  /* --------Rejects the changes to be updated in User Profile -------- */

  changeToReject (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.EditProfile.edittedProfile[index].status = 'Rejected'
    window.localStorage.setItem('Data', JSON.stringify(this.state.EditProfile))
    this.setState({ open: true })
    this.setState({ status: 'Rejected' })
  }

  /* -------Approves the changes to be updated in User Profile -------- */

  changeToApprove (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.EditProfile.edittedProfile[index].status = 'Approved'
    window.localStorage.setItem('Data', JSON.stringify(this.state.EditProfile))
    this.setState({ open: true })
    this.setState({ status: 'Approved' })
    var empId = this.state.EditProfile.edittedProfile[index].EmpId
    var newAddress = this.state.EditProfile.edittedProfile[index].Address
    var newContact = this.state.EditProfile.edittedProfile[index].ContactNum
    this.updateData(empId, newAddress, newContact, index)
  }

  /* --------Updates the changes to be updated in User Profile -------- */

  updateData (empId, newAddress, newContact, index) {
    let newState = Object.assign({}, this.state)
    var data = this.state.EditProfile.Employee
    var newEmpId = empId

    for (var i = 0; i < data.length; ++i) {
      var id = data[i].EmpId
      if (id === newEmpId) {
        newState.EditProfile.Employee[i].ContactNum = newContact
        newState.EditProfile.Employee[i].Address = newAddress
        window.localStorage.setItem(
          'Data',
          JSON.stringify(this.state.EditProfile)
        )
        this.state.EditProfile.edittedProfile.splice(index, 1)
      }
    }
  }

  render () {
    let empId = JSON.parse(localStorage.getItem('currentUserId'))
    var data1 = JSON.parse(window.localStorage.getItem('Data'))
    // data1 = data1.edittedProfile;
    if (data1.edittedProfile) {
      return (
        <div className='componentContainer absolute'>
        <h1 className='muli-semi-bold'>Profile Change Request</h1>
          <div className='tableWrapper'>
            
            <table className='tableCss'>
              <thead className='thead1'>
                {/* <tr className='thead1'> */}
                  <td className='thClass'>Employee Id</td>
                  <td className='thClass'>Employee Name</td>
                  <td className='thClass'>Address</td>
                  <td className='thClass'>Contact Number</td>
                  <td className='thClass'>Option</td>
                {/* </tr> */}
              </thead>
              <tbody>
                {this.state.EditProfile.edittedProfile.map((data, i) => {
                  return (
                    <tr key={i} className='tdDivider'>
                      <td className='tdClass'>{data.EmpId}</td>
                      <td className='tdClass'>{data.EmpName}</td>
                      <td className='tdClass'>{data.Address}</td>
                      <td className='tdClass'>{data.ContactNum}</td>
                      <td className='tdClass'>
                        <span className='Approve' onClick={e => this.changeToApprove(e, i)}>
                          <i class="fa fa-check-circle-o tick"/>
                        </span>
                        <span className='Approve' onClick={e => this.changeToReject(e, i)}>
                          <i class="fa fa-times-circle-o cross" />
                        </span>
                        {/* <button
                          className='rejectButtonProfile'
                          onClick={e => this.changeToReject(e, i)}
                        >
                          Reject
                        </button>
                        <span>&nbsp;</span>
                        <button
                          className='approveButtonProfile'
                          onClick={e => this.changeToApprove(e, i)}
                        >
                          Accept
                        </button> */}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <br />
            <div className='backButton'>
              <NavLink to='/profile'>
                <button className='rejectButtonProfile'>Back</button>
              </NavLink>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='componentContainer absolute'>
          <div className='approveProfileHeader'>No details</div>
        </div>
      )
    }
  }
}
export default EditProfileApproval
