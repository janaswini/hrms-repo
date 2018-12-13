import React, { Component } from 'react'

class MyLeaves extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LeaveRecord: JSON.parse(localStorage.getItem('Data'))
    }
  }

  render () {
    let id = JSON.parse(localStorage.getItem('currentUserId'))
    return (

      <div className=''>
        <div className='tableLabels'>My Leaves</div>
        <div className='tableWrapper'>
          <table className='tableCss'>
            <thead className='thead1'>
              {/* <tr className='thead1'> */}
                <td className='thClass'>Applied On</td>
                <td className='thClass'>LeaveType</td>
                <td className='thClass'>FromDate</td>
                <td className='thClass'>ToDate</td>
                <td className='thClass'>TotalDays</td>
                <td className='thClass'>status</td>
                <td className='thClass'>LeaveReason</td>
              {/* </tr> */}
            </thead>
            <tbody>
              {
                this.state.LeaveRecord.leaveRequest.map((record, i) =>
                  (record.EmpId === id) ? <tr key={i} className='tdDivider' >
                    <td className='tdClass'>{record.appliedOn.substr(0, 10)}</td>
                    <td className='tdClass'>{record.LeaveType}</td>
                    <td className='tdClass'>{record.FromDate.substr(0, 10)}</td>
                    <td className='tdClass'>{record.ToDate.substr(0, 10)}</td>
                    <td className='tdClass'>{record.TotalDays}</td>
                    <td className='tdClass'>{record.status}</td>
                    <td className='tdClass'>{record.LeaveReason}</td>
                  </tr>
                    : ''
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default MyLeaves
