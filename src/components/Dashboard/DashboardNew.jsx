import React, { Component } from 'react'
import './DashboardNew.css'
import Popup from 'reactjs-popup'
import moment from 'moment'

class LeaveRequests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRequestID: '',
      LeaveRecord: JSON.parse(localStorage.getItem('Data')),
      deletedRow: [],
      open: false,
      ischecked: false,
      checkedValue: [],
      index: '',
      LeaveRequestCount: 0
    }
  }

  componentDidMount () {
    let data = JSON.parse(localStorage.getItem('Data'))
    data = data.leaveRequest
    var count = 0
    data.map((record) => {
		  var compareDate = moment()
      var startDate = moment(record.FromDate)
			    var endDate = moment(record.ToDate)
			    if ((compareDate.isBetween(startDate, endDate)) ||
			         startDate || endDate) {
			          count++
			        }
      this.setState({ LeaveRequest: this.state.LeaveRequest = count })
			  })
  }
  closePopup (e) {
    this.setState({ open: false })
  }
  // Onclicking view button select the respective request to see the details
  sendReqId (e, i) {
    localStorage.setItem('currentRequestID', i)
  }
  // Delete the request from the list but not from the JSON
  delete (index) {
    var data = JSON.parse(localStorage.getItem('Data'))
    let reqId = this.state.LeaveRecord.leaveRequest[index].ReqestId
    if (data.deletedRow) {
      data.deletedRow[data.deletedRow.length] = reqId
      this.state.deletedRow.push(reqId)
      localStorage.setItem('Data', JSON.stringify(data))
    } else {
      data['deletedRow'] = []
      data.deletedRow[data.deletedRow.length] = reqId
      this.state.deletedRow.push(reqId)
      localStorage.setItem('Data', JSON.stringify(data))
    }
    window.location.reload(1)
  }

  // Reject leave request
  changeToReject (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.LeaveRecord.leaveRequest[index].status = 'Rejected'
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    this.setState({ open: true, index: i })
    this.setState({ status: 'Rejected' })
    this.delete(index)
  }

  // Reduce number of days from employee's pending leaves, if request is approved
  reduceLeaves (id, type, days) {
    let data = this.state.LeaveRecord.Employee
    let leave, leave1, leave2, leave3
    let newState = Object.assign({}, this.state)
    for (var i = 0; i < data.length; ++i) {
      if (data[i].EmpId === id) {
        leave = data[i].PendingLeaves.Planned
        leave1 = data[i].PendingLeaves.EmergencyLeave
        leave2 = data[i].PendingLeaves.Sick
        leave3 = data[i].PendingLeaves.Privilege
        if (type === 'Casual Leave') {
          leave = leave - days
          leave > 0 ? leave = leave : leave = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Planned = leave
        }
        if (type === 'Emergency Leave') {
          leave1 = leave1 - days
          leave1 > 0 ? leave1 = leave1 : leave1 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.EmergencyLeave = leave1
        }
        if (type === 'Sick Leave') {
          leave2 = leave2 - days
          leave2 > 0 ? leave2 = leave2 : leave2 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Sick = leave2
        }
        if (type === 'Earned Leave') {
          leave3 = leave3 - days
          leave3 > 0 ? leave3 = leave3 : leave3 = 0
          newState.LeaveRecord.Employee[i].PendingLeaves.Privilege = leave3
        }
        this.setState({ [this.state.LeaveRecord.Employee]: newState })
        localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
      }
    }
  }

  // Approve leave request
  changeToApprove (e, i) {
    let newState = Object.assign({}, this.state)
    let index = i
    newState.LeaveRecord.leaveRequest[index].status = 'Approved'
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
    let id = this.state.LeaveRecord.leaveRequest[index].EmpId
    let type = this.state.LeaveRecord.leaveRequest[index].LeaveType
    let days = parseInt(this.state.LeaveRecord.leaveRequest[index].TotalDays)
    this.setState({ status: 'Approved' })
    this.reduceLeaves(id, type, days)
    this.setState({ open: true })
    this.delete(index)
  }

  selectAll (e) {
    var inputElements = document.getElementsByClassName('selectCheckboxRequest')
    for (var i = 0; inputElements[i]; ++i) {
      inputElements[i].checked = true
    }
  }
  clearAll (e) {
    var inputElements = document.getElementsByClassName('selectCheckboxRequest')
    for (var i = 0; inputElements[i]; ++i) {
      inputElements[i].checked = false
    }
  }
  rejectAll (e) {
    var inputElements = document.getElementsByClassName('selectCheckboxRequest')
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        this.state.checkedValue.push(inputElements[i].getAttribute('data-id'))
      }
    }
    if (this.state.checkedValue.length > 0) {
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        let newState = Object.assign({}, this.state)
        newState.LeaveRecord.leaveRequest[index].status = 'Rejected'
        window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
      }
      this.setState({ open: true, status: 'Rejected' })
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        this.delete(index)
      }
      this.setState({ checkedValue: [] })
    } else {
      alert('Select record first')
    }
  }
  // *********************************************************
  approveAll (e) {
    var inputElements = document.getElementsByClassName('selectCheckboxRequest')
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        this.state.checkedValue.push(inputElements[i].getAttribute('data-id'))
      }
    }

    if (this.state.checkedValue.length > 0) {
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        let newState = Object.assign({}, this.state)
        newState.LeaveRecord.leaveRequest[index].status = 'Approved'
        let id = this.state.LeaveRecord.leaveRequest[index].EmpId
        let type = this.state.LeaveRecord.leaveRequest[index].LeaveType
        let days = parseInt(this.state.LeaveRecord.leaveRequest[index].TotalDays)
        window.localStorage.setItem('Data', JSON.stringify(this.state.LeaveRecord))
        this.reduceLeaves(id, type, days)
      }
      this.setState({ open: true, status: 'Approved' })
      for (var i = 0; i < this.state.checkedValue.length; ++i) {
        let index = parseInt(this.state.checkedValue[i])
        this.delete(index)
      }
      this.setState({ checkedValue: [] })
    } else {
      alert('Select record first')
    }
  }
  render () {
    var data = JSON.parse(localStorage.getItem('Data'))
		    if (data.leaveRequest) {
      return (
        // List of leave requests
        <div className='mainContainer'>
          <div className='leaveRecord'>
            {/* <div>
              <button className='RejectButton' onClick={e => this.selectAll(e)}>selectAll</button>
              <button className='ApproveButton' onClick={e => this.clearAll(e)}>rejectAll</button>
              <button className='RejectButton' onClick={e => this.rejectAll(e)}>Reject</button>
              <button className='ApproveButton' onClick={e => this.approveAll(e)}>Approve</button>
            </div> */}
            <div className='leave-requests' >
              <p className='leave-requests-p'> Leave Requests ({ this.state.LeaveRequest}) </p>

              <div className='leave-requests-12'>
                <table className='rectangleTable'>
                  <thead className='rowTableHead'>
                    <tr className='rowTable'>
                      {/* <i className='fa fa-search' /> */}
                      <th> search</th>
                      {/* <i class="fa fa-search" style="font-size:24px"> */}
                      <th>ID</th>
                      {/* <td className='tdStyle'>EmpName</td> */}

                      <th >Leave Type</th>
                      <th >Applied On</th>
                      <th >From</th>
                      <th >To</th>
                      <th >Days</th>
                      {/* <td className='tdStyle'>Reason</td> */}
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody className='rowTableBody'>
                    {data.leaveRequest.map((record, i) => {
                      return this.state.deletedRow.indexOf(record.ReqestId) === -1
                        ? <tr className='rowTable' key={i}>
                          <td ><input type='checkbox'
                            data-id={i} className='selectCheckboxRequest' defaultChecked={this.state.ischecked} />
                            <img className='profile-avatar' src={require('../../Assets/images/profile_icon.png')} />
                            {record.EmpName}
                          {/* {record.Dep} */}
                          </td>
                          <td>{record.EmpId}</td>
                          {/* <td className='tdStyle'>{record.EmpName}</td> */}
                          <td >{record.LeaveType}</td>
                          <td >{record.appliedOn.substr(0, 10)}</td>
                          <td >{record.FromDate.substr(0, 10)}</td>
                          <td >{record.ToDate.substr(0, 10)}</td>
                          <td >{record.TotalDays}</td>
                          <td>
                            <i className='fa fa-times-circle-o' onClick={e => this.changeToReject(e, i)} />
                            <span>&nbsp;</span>
                            <i class='fa fa-check-circle' onClick={e => this.changeToApprove(e, i)} />
                          </td>
                        </tr>
                        : ''
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Popup open={this.state.open} closeOnDocumentClick modal>
            <div>
              <span>{this.state.status} successfully</span><br />
              <button className='button' onClick={e => this.closePopup(e)}>OK</button>
            </div>
          </Popup>
        </div>
      )
    } else {
      return (
        <div className='noRequset'>No requests</div>
      )
    }
  }
}

export default LeaveRequests


