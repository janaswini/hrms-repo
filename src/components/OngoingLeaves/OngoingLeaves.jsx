import React, { Component } from 'react'
import './OngoingLeaves.css'
import moment from 'moment'

class OngoingLeaves extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LeaveRecord: JSON.parse(localStorage.getItem('Data')),
      open: false,
      FromDate: null,
      ToDate: null,
      newRecord: [],
      visible: false,
      OngoingLeavesCount: 0
    }
  }
  componentDidMount () {
    var data = JSON.parse(localStorage.getItem('Data'))
    data = data.leaveRequest
    var count = 0
    data.map((record) => {
      var compareDate = moment()
      var startDate = moment(record.FromDate)
      var endDate = moment(record.ToDate)
      var compareDateStr = (JSON.stringify(compareDate).substr(1, 10))
      var startDateStr = (JSON.stringify(startDate).substr(1, 10))
      var endDateStr = (JSON.stringify(endDate).substr(1, 10))
      if (((compareDate.isBetween(startDate, endDate)) ||
          compareDateStr === startDateStr || compareDateStr === endDateStr) && record.status === 'Approved') {
        count++            
          }
      this.setState({ OngoingLeaves: this.state.OngoingLeaves = count })
    })
  }

  render () {
    var newData = JSON.parse(localStorage.getItem('Data'))
    if (this.state.visible) {
      var data = this.state.newRecord
    } else {
      var data = newData.leaveRequest
    }
    if (!localStorage.getItem('currentUserId')) {
      return (
        window.location.replace('/')
      )
    } else {
      return (
        <div id='onGoingLeaves'>
          {/* <span className='tableLabels'>Ongoing leaves{' ' + this.state.OngoingLeaves}</span> */}
          <span className='tableLabels'>Ongoing leaves
          <span className='greyColor'>{' '+'('+this.state.OngoingLeaves+')'}</span>
          </span>
          <div className='tableWrapper'>
            <table className='tableCss'>
              <thead className='thead1'>
                {/* <tr className='thead1'> */}
                  <td className='thClass'><i class='fa fa-search' />
                    <input type='text' className='searchField' placeholder='Search' />
                  </td>
                  <td className='thClass'>Id</td>
                  <td className='thClass'>Leave Type</td>
                  <td className='thClass'>Applied on</td>
                  <td className='thClass'>From</td>
                  <td className='thClass'>To</td>
                  <td className='thClass'>Days</td>
                {/* </tr> */}
              </thead>
              <tbody>

                {
                  data.map((record, i) => {
                    var compareDate = moment()
                    var startDate = moment(record.FromDate)
                  var endDate = moment(record.ToDate)
                  var x = compareDate.isBetween(startDate, endDate)
                    var compareDateStr = (JSON.stringify(compareDate).substr(1, 11))
                    var startDatestr = (JSON.stringify(startDate).substr(1, 11))
                    var endDatestr = (JSON.stringify(endDate).substr(1, 11))
                    if (((compareDate.isBetween(startDate, endDate)) ||
                  compareDateStr === startDatestr ||
                  compareDateStr === endDatestr
                    ) && record.status === 'Approved'
                    ) {
                      return (
                        <tr key={i} className='tdDivider'>
                          <td className='tdClass'>
                        <img src={require('../../Assets/images/profile_icon.png')} />
                            <span className='empName'>{record.EmpName}</span></td>
                          <td className='tdClass'>{record.EmpId} </td>
                          <td className='tdClass'>{record.LeaveType}</td>
                          <td className='tdClass'>{record.appliedOn.substr(0, 10)}</td>
                          <td className='tdClass'>{record.FromDate.substr(0, 10)}</td>
                          <td className='tdClass'>{record.ToDate.substr(0, 10)}</td>
                          <td className='tdClass'>{record.TotalDays}</td>
                        </tr>
                      )
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}
export default OngoingLeaves
