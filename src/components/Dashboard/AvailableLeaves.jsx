import React, { Component } from 'react'
import './Dashboard.css'

class AvailableLeaves extends Component {
  render () {
    var leaves = JSON.parse(localStorage.getItem('Data'))
    var currentUserIdVar = localStorage.getItem('currentUserId')
    var plannedLeavesVar
    var emergencyLeavesVar
    var privilegeLeavesVar
    var sickLeavesVar
    (leaves.Employee).forEach(emp => {
      if (currentUserIdVar === JSON.stringify(emp.EmpId)) {
        plannedLeavesVar = emp.PendingLeaves.Planned
        emergencyLeavesVar = emp.PendingLeaves.EmergencyLeave
        privilegeLeavesVar = emp.PendingLeaves.Privilege
        sickLeavesVar = emp.PendingLeaves.Sick
      }
    })


    return (
      <div>


        <h2>Available Leaves</h2>

        <div id='dashboardContainer'>

          <div className='cardContainer'>
            <div className='icon'>
              <i className='fa fa-info fa-4x' aria-hidden='true' />
            </div>
            <div className='right'>
              <div className='icon-count'>{plannedLeavesVar}</div>
              <div className='icon-text'>Planned Holidays</div>
            </div>
          </div>

          <div className='cardContainer'>
            <div className='icon'>
              <i className='fa fa-info fa-4x' aria-hidden='true' />
            </div>
            <div className='right'>
              <div className='icon-count'>{emergencyLeavesVar}</div>
              <div className='icon-text'>Emergency Leave</div>
            </div>
          </div>

          <div className='cardContainer'>
            <div className='icon'>
              <i className='fa fa-info fa-4x' aria-hidden='true' />
            </div>
            <div className='right'>
              <div className='icon-count'>{privilegeLeavesVar}</div>
              <div className='icon-text'>Earned Leaves</div>
            </div>
          </div>

          <div className='cardContainer'>
            <div className='icon'>
              <i className='fa fa-info fa-4x' aria-hidden='true' />
            </div>
            <div className='right'>
              <div className='icon-count'>{sickLeavesVar}</div>
              <div className='icon-text'>Sick Leaves</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default AvailableLeaves
