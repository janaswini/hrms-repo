import React, { Component } from 'react'
import './PendingLeaves.css'

class PendingLeaves extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LeavePolicy: JSON.parse(localStorage.getItem('Data'))
    }
  }

  render () {
    let id = JSON.parse(localStorage.getItem('currentUserId'))
    let emp
    this.state.LeavePolicy.Employee.map((record, i) => {
      if (id === record.EmpId) {
        emp = record
      }
    })
    // let emp = this.state.LeavePolicy.Employee[id - 1]
    // iterate the loop and match id and EmpId
    //  List of available leaves for employee
    if(!localStorage.getItem('currentUserId'))
    {
    return(
     window.location.replace('/')
    )
    }
    else{
    return (
      <div className='leaveRecord'>
        <h2>Available Leaves</h2>
        <table>
          <thead className='thead1'>
            {/* <tr className='thead1'> */}
              <td className='tdStyle'>Leaves Type</td>
              <td className='tdStyle'>Leaves pending</td>
            {/* </tr> */}
          </thead>
          <tbody>

            <tr className='tdStyle' >
              <td className='tdStyle'>Planed Leaves</td>
              <td className='tdStyle'>{emp.PendingLeaves.Planned}</td>
            </tr>

            <tr className='tdStyle'>
              <td className='tdStyle'>Emergency Leaves (LOP)</td>
              <td className='tdStyle'>{emp.PendingLeaves.LOP}</td>
            </tr>

            <tr className='tdStyle'>
              <td className='tdStyle'> Sick Leaves</td>
              <td className='tdStyle'>{emp.PendingLeaves.Sick}</td>
            </tr>

            <tr className='tdStyle'>
              <td className='tdStyle'>Earned Leaves</td>
              <td className='tdStyle'>{emp.PendingLeaves.PriL}</td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
  }
}

export default PendingLeaves
