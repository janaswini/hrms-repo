import React, { Component } from 'react';
import './AddingHoliday.css';
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class AddingHoliday extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment(),
      day: '',
      occasion: '',
      open: '',
      errText: ''
    }
    this.change = this.change.bind(this)
    this.validation = this.validation.bind(this)
    this.DateChange = this.DateChange.bind(this)
  }
  change (e) {
    // set values to the state variable
    this.setState({ [e.target.name]: e.target.value })
  }
  validation () {
    // validation for the input character
    if (
      this.state.date === '' &&
      this.state.day === '' &&
      this.state.occasion === ''
    ) {
      this.setState({ open: true, errText: 'fields can not be empty' })
      return false
    }
    if (/^[a-zA-Z]+$/i.test(this.state.occasion) === false) {
      this.setState({ open: true, errText: 'please specify the Occasion' })
      // alert('please specify the Occasion')
      return false
    }
    return true
  }
  closeModal (e) {
    this.setState({ open: false })
  }

  submit () {
    // To update the value to the local storage
    var subdate = this.state.date._d
    subdate = JSON.stringify(subdate).substr(1, 10)
    var subday = this.state.date._locale._weekdays[this.state.date._d.getDay()]
    this.setState({
      date: (this.state.date = subdate),
      day: (this.state.day = subday)
    })
    // this.validation()
    if (this.validation()) {
      var data = JSON.parse(window.localStorage.getItem('Data'))
      var holiday = data.holidayList
      var calendar = data.holidays
      if (holiday) {
        holiday[holiday.length] = this.state
        window.localStorage.setItem('Data', JSON.stringify(data))
      } else {
        data['holidayList'] = []
        holiday[holiday.length] = this.state
        window.localStorage.setItem('Data', JSON.stringify(data))
      }
      if (calendar) {
        calendar[calendar.length] = this.state.date
        window.localStorage.setItem('Data', JSON.stringify(data))
      } else {
        data['holidays'] = []
        calendar[calendar.length] = this.state.date
        window.localStorage.setItem('Data', JSON.stringify(data))
      }
      this.setState({ open: true, errText: 'Successfully submitted' })
      window.location.reload()
      return true
    } else {
      this.setState({
        open: true,
        errText: 'data were incorrect....can not update the value'
      })
      // alert("data were incorrect....can't update the value")
    }
  }
  DateChange (dat) {
    // Update the date from user input
    this.setState({ date: dat })
  }
  isWeekday (date) {
    // To block the weekdays in the calendar
    const day = date._d.getDay()
    return day !== 0 && day !== 6
  }
  render () {
    var holidayList = JSON.parse(window.localStorage.getItem('Data'))
    holidayList = holidayList.holidays
    return (
      <div className='adding'>
        <div className='calendar'>
          <DatePicker
            className='Dp'
            selected={this.state.date}
            filterDate={this.isWeekday}
            showYearDropdown
            scrollableYearDropdown
            dateFormat='DD/MM/YYYY'
            minDate={moment()}
            maxDate={moment().add(24, 'months')}
            showDisabledMonthNavigation
            onChange={e => this.DateChange(e)}
            yearDropdownItemNumber={2}
            excludeDates={holidayList}
            inline
            placeholderText='Select a weekday'
            name='date'
          />
        </div>
        <div>
          <div>
            <label htmlFor='Occasion'>Occasion : </label>
          </div>
          <div>
            <textarea
              type='text'
              name='occasion'
              onChange={this.change}
              className='addText'
            />
          </div>
        </div>
        <input
          type='button'
          value='submit'
          className='popUpButton'
          onClick={this.submit.bind(this)}
        />

        <Popup open={this.state.open}>
          <div className='modal'>
            <a className='close' onClick={e => this.closeModal(e)}>
              &times;
            </a>
            {this.state.errText}
          </div>
        </Popup>
      </div>
    )
  }
}

export default AddingHoliday
