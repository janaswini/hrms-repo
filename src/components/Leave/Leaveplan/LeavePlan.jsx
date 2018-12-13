import React, { Component } from 'react'
import './Leaveplan.css'
import Popup from 'reactjs-popup'
import AddingHoliday from './AddingHoliday'

class LeavePlan extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Holiday: JSON.parse(window.localStorage.getItem('Data')),
      flag: false
    }
    this.change = this.change.bind(this)
  }
  delete (e, i) {
    for (var j = 0; j <= this.state.Holiday.holidayList.length; j++) {
      if (j === i) {
        // console.log(j)
        // console.log(i + '---------------------')
        var date = this.state.Holiday.holidayList[i].date
        console.log(date + '......................')
        for (var k = 0; k <= this.state.Holiday.holidays.length; k++) {
          if (this.state.Holiday.holidays[k] === date) {
            console.log(this.state.Holiday.holidays[k], date)
            this.state.Holiday.holidays.splice(k, 1)
          }
        }
        this.state.Holiday.holidayList.splice(i, 1)
        // window.location.reload('/leaveplan')
      }
      // console.log(JSON.stringify(this.state.Holiday.holidayList) + '--------- afr if')
    }
    // console.log(JSON.stringify(this.state.Holiday.holidayList) + '--------- afr for')
    window.localStorage.setItem('Data', JSON.stringify(this.state.Holiday))
    this.setState({ flag: true })
  }
  change (e, i) { // To Update the value to the Local Storage
    var item = {
      // Created an obj for the target value
      value: e.target.value,
      name: e.target.name,
      targetIndex: i
    }
    const newObject = this.state.Holiday.holidayList.map((holiday, j) => {
      for (var key in holiday) {
        // Check the target value and item name is same
        if (key === item.name && j === item.targetIndex) {
          holiday[key] = item.value
        }
      }
      return holiday
    })
    // To append the value to the Local storage
    this.setState({ [this.state.Holiday.holidayList]: newObject })
    window.localStorage.setItem('Data', JSON.stringify(this.state.Holiday))
  }
  render () {
    var role = JSON.parse(window.localStorage.getItem('currentUserRole'))
    // According to the role the view will be different
    if (role === 'Employee') {
      return (
        <div className='componentContainer'>
          <div className='tableLabels'>
              Holiday List
            <div className='tableWrapper'>

              <table className='tableCss'>

                <thead className='thead1'>
                  {/* <tr className='thead1'> */}
                    <td className='thClass'>Dates</td>
                    <td className='thClass'>days</td>
                    <td className='thClass'>Occasion</td>
                  {/* </tr> */}
                </thead>
                <tbody>
                  {this.state.Holiday.holidayList.map((holiday, i) => (
                    <tr key={holiday[i]} className='tdDivider'>
                      <td className='tdClass'>{holiday.date}</td>
                      <td className='tdClass'>{holiday.day}</td>
                      <td className='tdClass'>{holiday.occasion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    } else if (role === 'Employer' || this.state.flag === true) {
      return (
        <div className='componentContainer'>
          <div className='tableLabels'>
        Holiday List
            <div className='tableWrapper'>
              <table className='tableCss'>

                <thead className='thead1'>
                  {/* <tr className='thead1'> */}
                    <td className='thClass'>Dates</td>
                    <td className='thClass'>days</td>
                    <td className='thClass'>Occasion</td>
                    <td className='thClass'>Action</td>
                  {/* </tr> */}
                </thead>
                <tbody>
                  {
                    this.state.Holiday.holidayList.map((holiday, i) =>
                      <tr key={holiday[i]} className='tdDivider'>
                        <td className='tdClass' >
                          <input type='text' name='date' className='levtextarea'
                            onChange={e => this.change(e, i)}
                            value={holiday.date} />
                        </td>
                        <td className='tdClass' >
                          <input type='text' name='day' className='levtextarea'
                            onChange={e => this.change(e, i)}
                            value={holiday.day} />
                        </td>
                        <td className='tdClass' >
                          <input type='text' name='occasion' className='levtextarea'
                            onChange={e => this.change(e, i)}
                            value={holiday.occasion} />
                        </td>
                        <td className='tdClass'>
                          <input type='button' onClick={e => this.delete(e, i)} className='levbutton' value='Delete' />
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <Popup trigger={<button className='levAddbutton' >Add</button>} modal>
                {
                  close => (
                    <div id='sec'>
                      <a id='closebtn' onClick={close}>&times;</a>
                      <AddingHoliday />
                    </div>
                  )
                }
              </Popup>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default LeavePlan
