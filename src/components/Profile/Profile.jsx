import React, { Component } from 'react'
import './Profile.css'
import Modal from 'react-awesome-modal'
import EditProfile from './EditProfile'
export default class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Data: JSON.parse(localStorage.getItem('Data')),
      flag: false,
      image: ''
    }
  }

  openModalView () {
    this.setState({
      visibleView: true
    })
  }

  closeModalView () {
    this.setState({
      visibleView: false
    })
  }

  /* --------UI part for User Profile -------- */

  render () {
    let empId = JSON.parse(localStorage.getItem('currentUserId'))
    if (!localStorage.getItem('currentUserId')) {
      return window.location.replace('/')
    } else {
      return (
      /* --    User Profile   -- */

        <div className='componentContainer'>
          <div id='userProfileContainer'>
            <h1 className='UserProfile'>User Profile</h1>
            <form className='profileForm'>
              {this.state.Data.Employee.map(
                (data, i) =>
                  data.EmpId === empId ? (
                    <div key={i}>
                      <div className='userForm'>
                        <div className='imageProfile'>
                          <img
                            className='profileImage'
                            src={require('../../Assets/images/profile_icon.png')}
                          />
                        </div>
                        <hr className='hrProfile' />
                        <div>
                          <div className='profileInfo'>
                            <label className='inputLabel'>Employee Id</label>
                            <span className='input'>{data.EmpId}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Employee Name</label>
                            <span className='input'>{data.EmpName}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Employee Role</label>
                            <span className='input'> {data.Role}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Employee Domain</label>
                            <span className='input'>{data.Dep} </span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfoEmail'>
                            <label className='inputLabelEmail'>E-mail Id</label>
                            <span className='inputEmail'>{data.EmailId} </span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>
                              Employee Password
                            </label>
                            <span className='input'> {data.Password}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>
                              Employee Contact Number
                            </label>
                            <span className='input'> {data.ContactNum}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Date of Birth</label>
                            <span className='input'>{data.Dob} </span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Date of Joining</label>
                            <span className='input'> {data.Doj}</span>
                          </div>
                          <hr className='hrProfile' />
                          <div className='profileInfo'>
                            <label className='inputLabel'>Employee Address</label>
                            <span className='input'>{data.Address}</span>
                          </div>
                          <hr className='hrProfile' />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )
              )}
            </form>
            <input
              type='button'
              className='requestProfileEditButton'
              value='Profile Change Request'
              onClick={() => this.openModalView()}
            />
            <Modal
              visible={this.state.visibleView}
              width='700'
              height='400'
              margin-bottom='20'
              color='white'
              onClickAway={() => this.closeModalView()}
            >
              <div id='modalEditProfile'>
                <EditProfile />
                <a
                  href='javascript:void(0);'
                  onClick={() => this.closeModalView()}
                >
                  X
                </a>
              </div>
            </Modal>
          </div>
        </div>
      )
    }
  }
}
