import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './SideNav.css'

class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navFlag: '',
      employeeVisibility: '',
      showButtons: 'sidenavHide',
      cssShape: 'triangle-right',
      HomeCss: '',
      prevState: null,
      currentUserRoleVar: JSON.parse(localStorage.getItem('currentUserRole'))
    }
    this.showButtonsFunction = this.showButtonsFunction.bind(this)
  }

  showButtonsFunction() {
    if (this.state.showButtons === 'sidenavHide') {
      this.setState({
        showButtons: (this.state.showButtons = 'sidenavDisplay sidenav'),
        cssShape: (this.state.cssShape = 'triangle-down')
      })
    } else if (
      this.state.showButtons === 'sidenavDisplay sidenav' ||
      this.state.showButtons === 'sidenavDisplay'
    ) {
      this.setState({
        showButtons: (this.state.showButtons = 'sidenavHide'),
        cssShape: (this.state.cssShape = 'triangle-right')
      })
    }
  }

  componentWillMount() {
    var visibilityVar = JSON.parse(localStorage.getItem('currentUserRole'))
    visibilityVar === 'Employee' &&
      this.setState({
        employeeVisibility: (this.state.employeeVisibility = 'employeeCss')
      })
  }

  componentDidUpdate() {
    if (this.state.currentUserRoleVar === 'Employer') {
      ReactDOM.findDOMNode(this.refs.dashboard).style.color = '';
      ReactDOM.findDOMNode(this.refs.leaverequest).style.color = '';
      ReactDOM.findDOMNode(this.refs.leaveRecord).style.color = '';
      ReactDOM.findDOMNode(this.refs.MyLeaves).style.color = '';
      ReactDOM.findDOMNode(this.refs.LeavePolicy).style.color = '';
      ReactDOM.findDOMNode(this.refs.leaveplan).style.color = '';
      ReactDOM.findDOMNode(this.refs.addUser).style.color = '';
      ReactDOM.findDOMNode(this.refs.approveProfile).style.color = '';
      ReactDOM.findDOMNode(this.refs.calendar).style.color = '';

      if (window.location.pathname === '/leaveRecords') {
        ReactDOM.findDOMNode(this.refs.leaveRecord).style.color =
          '#FF7D27';
      } else if (window.location.pathname === '/leaverequest') {
        ReactDOM.findDOMNode(this.refs.leaverequest).style.color =
          '#FF7D27';
      } else if (window.location.pathname === '/dashboard') {
        ReactDOM.findDOMNode(this.refs.dashboard).style.color = '#FF7D27';
      } else if (window.location.pathname === '/MyLeaves') {
        ReactDOM.findDOMNode(this.refs.MyLeaves).style.color = '#FF7D27';
      } else if (window.location.pathname === '/LeavePolicy') {
        ReactDOM.findDOMNode(this.refs.LeavePolicy).style.color =
          '#FF7D27';
      } else if (window.location.pathname === '/leaveplan') {
        ReactDOM.findDOMNode(this.refs.leaveplan).style.color = '#FF7D27';
      } else if (window.location.pathname === '/addUser') {
        ReactDOM.findDOMNode(this.refs.addUser).style.color = '#FF7D27';
      } else if (window.location.pathname === '/approveProfile') {
        ReactDOM.findDOMNode(this.refs.approveProfile).style.color ='#FF7D27';
      }else if (window.location.pathname === '/calendar') {
        ReactDOM.findDOMNode(this.refs.calendar).style.color ='#FF7D27';
      }
    }
     else if (this.state.currentUserRoleVar === 'Employee') {
      ReactDOM.findDOMNode(this.refs.dashboard).style.color = '';
      ReactDOM.findDOMNode(this.refs.MyLeaves).style.color = '';
      ReactDOM.findDOMNode(this.refs.LeavePolicy).style.color = '';
      ReactDOM.findDOMNode(this.refs.leaveplan).style.color = '';
      ReactDOM.findDOMNode(this.refs.calendar).style.color = '';
      ReactDOM.findDOMNode(this.refs.leaverequest).style.color = '';

      if (window.location.pathname === '/dashboard') {
        ReactDOM.findDOMNode(this.refs.dashboard).style.color = '#FF7D27'
      } else if (window.location.pathname === '/MyLeaves') {
        ReactDOM.findDOMNode(this.refs.MyLeaves).style.color = '#FF7D27'
      } else if (window.location.pathname === '/LeavePolicy') {
        ReactDOM.findDOMNode(this.refs.LeavePolicy).style.color = '#FF7D27'
      } else if (window.location.pathname === '/leaveplan') {
        ReactDOM.findDOMNode(this.refs.leaveplan).style.color = '#FF7D27'
      }else if (window.location.pathname === '/calendar') {
        ReactDOM.findDOMNode(this.refs.calendar).style.color ='#FF7D27';
      }else if (window.location.pathname === '/leaverequest') {
        ReactDOM.findDOMNode(this.refs.leaverequest).style.color =
          '#FF7D27';
      }
    }
  }
  componentDidMount() {
    if (window.location.pathname === '/dashboard') {
      this.setState({
        showButtons: (this.state.showButtons = 'sidenavHide'),
        cssShape: (this.state.cssShape = 'triangle-right')
      })
    } else {
      this.setState({
        showButtons: (this.state.showButtons = 'sidenavDisplay'),
        cssShape: (this.state.cssShape = 'triangle-down')
      })
    }
  }

  render() {
    return (
      <div className='sidenav'>
        {this.state.currentUserRoleVar === 'Employer' ? (
          <div>
            <Link to='/dashboard'>
              <button ref='dashboard'> Home </button>
            </Link>
            <Link to='/leaveRecords'>
              <button ref='leaveRecord'> Leave records </button>
            </Link>
            <Link to='/MyLeaves'>
              <button ref='MyLeaves'> My Leaves </button>
            </Link>
            <Link to='/calendar'>
              <button ref='calendar'> Calendar </button>
            </Link>
            <Link to='/addUser'>
              <button ref='addUser'> Peoples </button>
            </Link>
            <Link to='/LeavePolicy'>
              <button ref='LeavePolicy'> Leave Policy </button>
            </Link>
            <Link to='/leaverequest'>
              <button ref='leaverequest'> Leave Request </button>
            </Link>
            <Link to='/leaveplan'>
              <button ref='leaveplan'> Public holidays</button>
            </Link>
            <Link to='/approveProfile'>
              <button ref='approveProfile'> Approve Profile </button>
            </Link>
          </div>
        ) : (
            <div>
              <Link to='/dashboard'>
                <button ref='dashboard'> Home </button>
              </Link>
              <Link to='/calendar'>
              <button ref='calendar'> Calendar </button>
            </Link>
              <Link to='/leaverequest'>
                <button ref='leaverequest'> Leave Request </button>
              </Link>
              <Link to='/MyLeaves'>
                <button ref='MyLeaves'> My Leave </button>
              </Link>
              <Link to='/LeavePolicy'>
                <button ref='LeavePolicy'> Leave Policy </button>
              </Link>
              <Link to='/leaveplan'>
                <button ref='leaveplan'> Public Holidays </button>
              </Link>
            </div>
          )}
      </div>
    )
  }
}

export default SideNav
