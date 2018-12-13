import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import './LeaveRequest.css'

class LeaveRequest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      EmpId: '',
      EmpName: '',
      TotalDays: '1',
      FromDate: moment(),
      ToDate: moment(),
      LeaveType: '',
      LeaveReason: '',
      ReqestId: moment(),
      appliedOn: moment(),
      exclude: [],
      status: '',
      comment: '',
      render: '',
      errdate: '',
      dateErr: '',
      erroption: '',
      opText: '',
      Err: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.DateFromChange = this.DateFromChange.bind(this)
    this.DateToChange = this.DateToChange.bind(this)
    this.numOfDays = this.numOfDays.bind(this)
    this.validation = this.validation.bind(this)
    this.finalValidation = this.finalValidation.bind(this)
  }
  validation () { //  validating the input values
    this.setState({
      errdate: '',
      dateErr: '',
      erroption: '',
      opText: '',
      Err: ''
    })
    if (this.state.FromDate._d > this.state.ToDate._d) {
      this.setState({ errdate: '1px solid red', dateErr: 'From date need to be proper' })
      return (false)
    }
    var data = JSON.parse(window.localStorage.getItem('Data'))
    var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
    this.setState({ EmpId: currentUserId })
    data = data.Employee
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].EmpId, (currentUserId))
      if (data[i].EmpId === currentUserId) {
        if (this.state.LeaveType === 'Casual Leave') {
          if (data[i].PendingLeaves.Planned < this.state.TotalDays) {
            this.setState({ opText: 'You have only ' + data[i].PendingLeaves.Planned + ' days', erroption: '1px solid red' })
            return false
          }
        } else if (this.state.LeaveType === 'Emergency Leave') {
          if (this.state.TotalDays > data[i].PendingLeaves.EmergencyLeave) {
            this.setState({ opText: 'You have only ' + data[i].PendingLeaves.EmergencyLeave + ' days', erroption: '1px solid red' })
            return (false)
          }
        } else if (this.state.LeaveType === 'Sick Leave') {
          if (this.state.TotalDays > data[i].PendingLeaves.Sick) {
            this.setState({ opText: 'You have only ' + data[i].PendingLeaves.Sick + ' days', erroption: '1px solid red' })
            return (false)
          }
        } else if (this.state.LeaveType === 'Earned Leave') {
          if (this.state.TotalDays > data[i].PendingLeaves.Privilege) {
            this.setState({ opText: 'You have only ' + data[i].PendingLeaves.Privilege + ' days', erroption: '1px solid red' })
            return (false)
          }
        }
      }
    }
    return (true)
  }
  componentDidMount () {
    var data = JSON.parse(window.localStorage.getItem('Data'))
    var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
    // this.setState({})
    var holi
    data.Employee.map((holis) => {
      if (holis.EmpId === currentUserId) {
        if (holis.leaveTaken) {
          // var holi = { ...holis.leaveTaken }
          // console.log(holi)
          holi = [ ...data.holidays, ...holis.leaveTaken ]
          this.setState({
            exclude: this.state.exclude = holi
          }, () => {
            // console.log(JSON.stringify(this.state.exclude) + 'sec')
          })
        } else {
          holi = [ ...data.holidays ]
          this.setState({
            exclude: this.state.exclude = holi
          }, () => {
            // console.log(JSON.stringify(this.state.exclude) + 'sec')
          })
        }
      }
    })
  }
  handleChange (e) { // To set the values to the state
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.validation()
    })
    // this.numOfDays()
  }
  DateFromChange (date) { // Update the From date from user input
    this.setState({ FromDate: date }, () => {
      this.numOfDays()
      console.log(this.state.FromDate+'from')
    })
  }
  DateToChange (date) { // Update the To date from the User input
    this.setState({ ToDate: this.state.ToDate = date }, () => {
      this.numOfDays()
    })
  }
  finalValidation () {
    this.setState({
      Err: '',
      errdate: '',
      dateErr: ''
    })
    if (this.state.TotalDays === '' || this.state.FromDate === '' ||
      this.state.ToDate === '' || this.state.LeaveType === '' || this.state.LeaveReason === '') {
      this.setState({ Err: 'Leave type can not be empty ' })
      return (false)
    }
    var start = new Date(this.state.FromDate)
    var end = new Date(this.state.ToDate)
    while (start <= end) {
      console.log(JSON.stringify(start).substr(1, 10))
      if (this.state.exclude.indexOf(JSON.stringify(start).substr(1, 10)) !== -1) {
        this.setState({ errdate: '1px solid red', dateErr: 'You cannot pick these date' })
        return (false)
      }
      var newDate = start.setDate(start.getDate() + 1)
      start = new Date(newDate)
    }
    return true
  }
  handleSubmit (event) {
    // Calling the validation function and
    // Updating the value to the Local storage
    event.preventDefault()
    if (this.finalValidation()===true) {
       
      var data = JSON.parse(window.localStorage.getItem('Data'))
      var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
      var currentUser = JSON.parse(window.localStorage.getItem('currentUserName'))
      var obj = Object.assign({}, {
        EmpId: currentUserId,
        EmpName: currentUser,
        ReqestId: this.state.ReqestId._d.getTime(),
        appliedOn: this.state.appliedOn._d,
        status: 'Pending',
        FromDate: this.state.FromDate,
        ToDate: this.state.ToDate,
        TotalDays: this.state.TotalDays,
        LeaveReason: this.state.LeaveReason,
        LeaveType: this.state.LeaveType
      })
  
      if (data.leaveRequest) {
        // checked the key is present. If it's present than append the value
          data.leaveRequest[data.leaveRequest.length] = obj
          window.localStorage.setItem('Data', JSON.stringify(data))
          document.getElementById('success').style.opacity = 1
          setTimeout(function () { document.getElementById('success').style.opacity = 0 }, 1000)
          this.calldispatch()
      } else {
        // If not then create a key and append the value
        data['leaveRequest'] = []
          data.leaveRequest[data.leaveRequest.length] = obj
          window.localStorage.setItem('Data', JSON.stringify(data))
          document.getElementById('success').style.opacity = 1
          setTimeout(function () { document.getElementById('success').style.opacity = 0 }, 1000)
          this.calldispatch()
      }
      var start = new Date(this.state.FromDate)
      var end = new Date(this.state.ToDate)
      while (start <= end) {
        var leavDate = JSON.stringify(start).substr(1, 10)
        data.Employee.map((dat) => {
          if (dat.EmpId === currentUserId) {
            if (dat.leaveTaken) {
              dat.leaveTaken[dat.leaveTaken.length] = leavDate
              window.localStorage.setItem('Data', JSON.stringify(data))
            } else {
              dat['leaveTaken'] = []
              dat.leaveTaken[dat.leaveTaken.length] = leavDate
              window.localStorage.setItem('Data', JSON.stringify(data))
            }
          }
        })
        var newDate = start.setDate(start.getDate() + 1)
        start = new Date(newDate)
      }
    } 
  }
  calldispatch () {
    this.setState({
      FromDate: moment(),
      ToDate: moment(),
      ReqestId: moment(),
      appliedOn: moment(),
      LeaveType: '',
      render:true,
      LeaveReason: '',
      TotalDays: ''
    })
  }
  isWeekday (date) {
    // To block the weekdays in the calendar
    const day = date._d.getDay()
    return day !== 0 && day !== 6
  }

  numOfDays () {
    // To generate number of holiday days
    if (this.state.FromDate === null || this.state.ToDate === null) {
      return this.setState({ TotalDays: 0 })
    }
    var start = JSON.stringify(this.state.FromDate).substr(1, 10)
    var end = new Date(this.state.ToDate)
    var flag = false
    var loop = new Date(start)
    var date, newDate, count
    var holiday = JSON.parse(window.localStorage.getItem('Data'))
    var currentUserId = JSON.parse(window.localStorage.getItem('currentUserId'))
    if (loop <= end) {
      console.log('25-------------')
      count = 0
      while (loop <= end) {
        date = JSON.stringify(loop).substr(1, 10)
        holiday.holidays.map((holi) => { // To check it's holiday
          if (holi === date) {
            flag = true
          }
        })
        holiday.Employee.map((user, i) => {
          if (user.EmpId === currentUserId) {
            if (holiday.Employee[i].leaveTaken) {
              holiday.Employee[i].leaveTaken.map((taken) => {
                if (taken === date) {
                  flag = true
                }
              })
            }
          }
        })
        if ((loop.getDay() === 0 || loop.getDay() === 6 || flag === true) === false) {
          count++
        }
        flag = false
        newDate = loop.setDate(loop.getDate() + 1)
        loop = new Date(newDate)
      }
    } else {
      count = 0
    }
    this.setState({ TotalDays: this.state.TotalDays = count }, () => {
      this.validation()
    })
  }
  render () {
    if (!window.localStorage.getItem('currentUserId')) {
      return (
        window.location.replace('/')
      )
    } else if (window.localStorage.getItem('currentUserId') || this.state.render===true) {
      return (
        <div className='componentContainer muli-semi-bold'>
          <div id='leaveRequestContainer'>
            <div id='success'>
              <h3 id='changed'>Successfully submitted</h3>
            </div>
            <div>
              <div className='head'>
                <h2>Leave Request</h2>
              </div>
              <form className='reqForm'>
                <div className='reqRow'>
                  <div className='reqText'>
                    <label htmlFor='drop'>Type</label>
                  </div>
                  <div className='reqInput'>
                    <select name='LeaveType' className='reqOptions width' value={this.state.LeaveType}
                      onChange={this.handleChange} style={{ border: this.state.erroption }}>
                      <option value='' disabled>select your option</option>
                      <option value='Casual Leave'>Casual Leave</option>
                      <option value='Emergency Leave'>Emergency Leave</option>
                      <option value='Sick Leave'>Sick leave</option>
                      <option value='Earned Leave'>Earned Leave</option>
                      <option value='LOP'>LOP</option>
                    </select>
                  </div>
                  <div className='err'>{this.state.opText}</div>
                </div>
                <div className='reqRow'>
                  <div className='reqText'>
                    <label htmlFor='drop'>From</label>
                  </div>
                  <div value={this.state.FromDate} name='From'>
                    <DatePicker className='reqOptions calendarIcon' style={{ border: this.state.errdate }}
                      selected={this.state.FromDate}
                      filterDate={this.isWeekday}
                      showYearDropdown
                      scrollableYearDropdown
                      dateFormat='DD/MM/YYYY'
                      minDate={moment()}
                      maxDate={moment().add(24, 'months')}
                      showDisabledMonthNavigation
                      onChange={e => this.DateFromChange(e)}
                      yearDropdownItemNumber={2}
                      excludeDates={this.state.exclude}
                      placeholderText='Select a weekday'
                      name='From' />
                  </div>
                  <div className='err'>{this.state.dateErr}</div>
                </div>
                <div className='reqRow'>
                  <div className='reqText'>
                    <label htmlFor='drop'>To</label>
                  </div>
                  <div name='To' value={this.state.ToDate} className='reqInput'>
                    <DatePicker className='reqOptions calendarIcon' style={{ border: this.state.errdate }}
                      selected={this.state.ToDate}
                      filterDate={this.isWeekday}
                      showYearDropdown
                      dateFormat='DD/MM/YYYY'
                      onChange={e => this.DateToChange(e)}
                      scrollableYearDropdown
                      minDate={this.state.FromDate}
                      maxDate={moment(this.state.FromDate).add(24, 'months')}
                      showDisabledMonthNavigation
                      yearDropdownItemNumber={2}
                      excludeDates={this.state.exclude}
                      placeholderText='Select a weekday'
                      name='To' />
                  </div>
                  <div className='err'>{this.state.dateErr}</div>
                </div>
                <div className='reqRow'>
                  <div className='reqText'>
                    <label htmlFor='Number_of_Days'>Number of Days</label>
                  </div>
                  <div className='reqInput'>
                    <input className='reqOptions disable' type='text' value={this.state.TotalDays} disabled id='TotalDays' name='TotalDays' />
                  </div>
                </div>
                <div className='reqRow'>
                  <div className='reqText'>
                    <label htmlFor='drop'>Reason</label>
                  </div>
                  <div name='LeaveReason' className='reqInput'
                    onChange={e => this.handleChange(e)}>
                    <textarea className='reqOptions' value={this.state.LeaveReason} placeholder='Reason' name='LeaveReason' />
                  </div>
                  <div className='err'>{this.state.Err}</div>
                </div>
                <div >
                  <button className='levAddbutton'
                    onClick={this.handleSubmit}>Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>// rightContainer done
      )
    }
  }
}
export default LeaveRequest
