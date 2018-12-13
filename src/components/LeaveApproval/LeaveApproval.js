import React, { Component } from 'react';
import './LeaveApproval.css';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
class LeaveApproval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      status: '',
      LeaveRecord: JSON.parse(localStorage.getItem('Data')),
      pending: '',
      comment: ''
    }
  }
  closePopup (e) {
    this.setState({ open: false })
  }
  // componentDidMount () {
  //   let data = JSON.parse(localStorage.getItem('Data'))
  //   this.setState({ LeaveRecord: data.leaveRequest })
  //   alert(this.state.LeaveRecord)
  // }

  // Reject leave request
  changeToReject (e) {
    let newState = Object.assign({}, this.state)
    console.log(newState)
    let index = window.localStorage.getItem('currentRequestID')
    newState.LeaveRecord.leaveRequest[index].status = 'Rejected';
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    this.setState({ open: true })
    this.setState({ status: 'Rejected' })
  }

  // Reduce number of days from employee's pending leaves, if request is approved
  reduceLeaves (index) {
    let emp = parseInt(this.state.LeaveRecord.leaveRequest[index].EmpId, 10)
    let type = this.state.LeaveRecord.leaveRequest[index].LeaveType
    let days = parseInt(this.state.LeaveRecord.leaveRequest[index].TotalDays)
    let leave = this.state.LeaveRecord.Employee[emp - 1].PendingLeaves.Planed
    let leave1 = this.state.LeaveRecord.Employee[emp - 1].PendingLeaves.LOP
    let leave2 = this.state.LeaveRecord.Employee[emp - 1].PendingLeaves.Sick
    let leave3 = this.state.LeaveRecord.Employee[emp - 1].PendingLeaves.PriL
    let newState = Object.assign({}, this.state)
    // alert(emp + "" + type)
    const newObject = this.state.LeaveRecord.Employee.map((data, i) => {
      // Compare employee ID and change the respective pending leaves
      if (data.EmpId === emp) {
        if (type === 'Casual Leave') {
          leave = leave - days
          leave > 0 ? (leave = leave) : (leave = 0)
          newState.LeaveRecord.Employee[emp - 1].PendingLeaves.Planed = leave
        }
        if (type === 'Emergency leave') {
          leave1 = leave1 - days
          leave1 > 0 ? (leave1 = leave1) : (leave1 = 0)
          newState.LeaveRecord.Employee[emp - 1].PendingLeaves.LOP = leave1
        }
        if (type === 'Sick leave') {
          leave2 = leave2 - days
          leave2 > 0 ? (leave2 = leave2) : (leave2 = 0)
          newState.LeaveRecord.Employee[emp - 1].PendingLeaves.Sick = leave2
        }
        if (type === 'Earned Leave') {
          leave3 = leave3 - days
          leave3 > 0 ? (leave3 = leave3) : (leave3 = 0)
          newState.LeaveRecord.Employee[emp - 1].PendingLeaves.PriL = leave3
        }
      }
    })
    this.setState({ [this.state.LeaveRecord.Employee]: newObject })
    localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
  }

  // Approve leave request
  changeToApprove (e) {
    let newState = Object.assign({}, this.state)
    console.log(newState)
    let index = window.localStorage.getItem('currentRequestID')
    newState.LeaveRecord.leaveRequest[index].status = 'Approved';
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    this.setState({ open: true })
    this.setState({ status: 'Approved' })
    this.reduceLeaves(index)
  }
  //   for adding comments
  changeComment (e) {
    let newState = Object.assign({}, this.state)
    let index = localStorage.getItem('currentRequestID')
    newState.LeaveRecord.leaveRequest[index].comment = e.target.value
    console.log(e.target.value)
    this.setState(newState)
    localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
  }

  render () {
    let index = window.localStorage.getItem('currentRequestID')
    return (
      // Details of leave request
      <div className='leaveRecord'>
        <table>
          <thead className='thead1'>
            {/* <tr className='thead1'> */}
              <td className='tdStyle'>Name</td>
              <td className='tdStyle'>LeaveType</td>
              <td className='tdStyle'>FromDate</td>
              <td className='tdStyle'>ToDate</td>
              <td className='tdStyle'>TotalDays</td>
              <td className='tdStyle'>LeaveReason</td>
              <td className='tdStyle'>&nbsp;</td>
            {/* </tr> */}
          </thead>
          <tbody>
            {
              this.state.LeaveRecord.leaveRequest.map((record, i) => {
                <tr key={i} className='tdStyle'>
                  <td className='tdStyle'>{record.EmpName}</td>
                  <td className='tdStyle'>{record.EmpId}</td>
                  <td className='tdStyle'>{record.LeaveType}</td>
                  <td className='tdStyle'>{record.appliedOn.substr(0, 10)}</td>
                  <td className='tdStyle'>{record.FromDate.substr(0, 10)}</td>
                  <td className='tdStyle'>{record.ToDate.substr(0, 10)}</td>
                  <td className='tdStyle'>{record.TotalDays}</td>
                  <td className='tdStyle'>{record.LeaveReason}</td>
                  <td className='tdStyle'>
                    <button className='RejectButton' onClick={e => this.changeToReject(e)}>Reject</button><span>&nbsp;</span>
                    <button className='ApproveButton' onClick={e => this.changeToApprove(e)}>Approve</button>
                  </td>
                </tr>
              })}
          </tbody>
        </table>
        <br />
        <div className='backButton'>
          <NavLink to='/leavelist'>
            <button>Back</button>
          </NavLink>
        </div>
        <Popup open={this.state.open} closeOnDocumentClick modal>
          <div>
            <span>{this.state.status} successfully</span>
            <br />
            <button className='button' onClick={e => this.closePopup(e)}>
              OK
            </button>
          </div>
        </Popup>
      </div>
    )
  }
}
export default LeaveApproval
