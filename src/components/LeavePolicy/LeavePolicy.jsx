import React, { Component } from 'react'
import './LeavePolicy.css'
import AddingPolicy from './AddingPolicy'
import Modal from 'react-awesome-modal'
import LeaveDetails from './LeaveDetails'
class LeavePolicy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LeavePolicy: JSON.parse(localStorage.getItem('Data')),
      flag: false,
      row: [{}]
    }
    this.change = this.change.bind(this)
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
  openModalAdd () {
    this.setState({
      visibleAdd: true
    })
  }

  closeModalAdd () {
    this.setState({
      visibleAdd: false
    })
  }

  /* --------Deletes the changes in table -------- */

  delete (e, i) {
    for (var j = 0; j <= this.state.LeavePolicy.leavePolicy.length; j++) {
      if (j === i) {
        this.state.LeavePolicy.leavePolicy.splice(i, 1)
        window.location.reload('/leavePolicy')
      }
    }
    window.localStorage.setItem('Data', JSON.stringify(this.state.LeavePolicy))
    this.setState({ flag: true })
  }

  /* --   Onchange Function   -- */

  change (e, i) {
    var item = {
      value: e.target.value,
      name: e.target.name,
      targetIndex: i
    }

    /* --   Storing values in LocalStorage   -- */

    const newObject = this.state.LeavePolicy.leavePolicy.map(
      (leavePolicy, j) => {
        for (var key in leavePolicy) {
          if (key === item.name && j === item.targetIndex) {
            leavePolicy[key] = item.value
          }
        }
        return leavePolicy
      }
    )
    this.setState({ [this.state.LeavePolicy.leavePolicy]: newObject })
    localStorage.setItem('Data', JSON.stringify(this.state.LeavePolicy))
  }
  render () {
    var data = JSON.parse(localStorage.getItem('Data'))
    let empId = JSON.parse(localStorage.getItem('currentUserId'))
    let role = ''
    data.Employee.map((list, index) => {
      if (list.EmpId === empId) {
        role = list.Role
      }
    })

    /* --   Employer Execution part    -- */

    if (role === 'Employer' || this.state.flag === true) {
      return (
        <div className='componentContainer'>
          <div className='tableLabels'>
            Leave Policy(2018)
            <input
              type='button'
              className='policyViewButton'
              value='Details'
              onClick={() => this.openModalView()}
            />
            <Modal 
              visible={this.state.visibleView}
              width='800'
              height='500'
              margin-bottom='20'
              color='white'
              onClickAway={() => this.closeModalView()}
            >
              <div id='modalView'>
                <LeaveDetails />
                <a
                  href='javascript:void(0);'
                  onClick={() => this.closeModalView()}
                >
                  Close
                </a>
              </div>
            </Modal>
          </div>
          <div className='tableWrapper'>
            <table className='tableCss'>
              <thead className='thead1'>
                {/* <tr className='thead1'> */}
                  <td className='thClass'>Leave Name</td>
                  <td className='thClass'>NO.of Days</td>
                  <td className='thClass'>Terms</td>
                  <td className='thClass'>Function</td>
                {/* </tr> */}
              </thead>
              <tbody>
                {this.state.LeavePolicy.leavePolicy.map((data, i) => (
                  <tr key={data.id} className='tdDivider'>
                    <td className='tdClass'>
                    <input
                        type='text'
                        name='Name'
                        onChange={e => this.change(e, i)}
                        value={data.Name} />
                    
                    </td>
                    <td className='tdClass'>
                      <input
                        type='text'
                        name='Days'
                        onChange={e => this.change(e, i)}
                        value={data.Days} />
                    </td>
                    <td className='tdClass'>
                      <input
                      type='text'
                        name='Terms'
                        onChange={e => this.change(e, i)}
                        value={data.Terms}
                      />
                    </td>
                    <td className='tdClass'>
                      <button
                      // onClick={this.handleRemoveSpecificRow(i)}
                        onClick={e => this.delete(e, i)}
                        className='policyDeleteButton'
                      >
                      Delete Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='mandatory'>
            Note: The employee will encounter/incur a"double LOP" for leaves
            taken without any prior intimation.
          </p>
          <input
            type='button'
            className='policyAddButton'
            value='Add'
            onClick={() => this.openModalAdd()}
          />
          <Modal
            visible={this.state.visibleAdd}
            width='800'
            height='350'
            margin-bottom='20'
            color='white'
            onClickAway={() => this.closeModalAdd()}
          >
            <div id='modalView'>
              <div id='modal'>
                <a
                  href='javascript:void(0);'
                  onClick={() => this.closeModalAdd()}
                >
                  X
                </a>
              </div>

              <AddingPolicy />
            </div>
          </Modal>
        </div>
        
      )
    } else {
      /* --    Employee Execution part    -- */

      return (
        <div className='componentContainer'>
          <div className='tableLabels'>
         Leave Policy(2018)
            <input
              type='button'
              className='policyViewButton'
              value='Details'
              onClick={() => this.openModalView()}
            />
            <Modal
              visible={this.state.visibleView}
              width='800'
              height='500'
              margin-bottom='20'
              color='white'
              onClickAway={() => this.closeModalView()}
            >
              <div id='modal'>
                <LeaveDetails />
                <a
                  href='javascript:void(0);'
                  onClick={() => this.closeModalView()}
                >
                  Close
                </a>
              </div>
            </Modal>
          </div>
          <div className='tableWrapper'>
            <table className='tableCss'>
              <thead className='thead1'>
                {/* <tr className='thead1'> */}
                  <td className='thClass'>Leave Name</td>
                  <td className='thClass'>NO.of Days</td>
                  <td className='thClass'>Terms</td>
                {/* </tr> */}
              </thead>
              <tbody>
                {this.state.LeavePolicy.leavePolicy.map((data, i) => (
                  <tr key={data.id} className='tdDivider'>
                    <td className='tdClass'> {data.Name}</td>
                    <td className='tdClass'>{data.Days}</td>
                    <td className='tdClass'>{data.Terms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='mandatory'>
            Note: The employee will encounter/incur a"double LOP" for leaves
            taken without any prior intimation.
          </p>
        </div>
      )
    }
  }
}

export default LeavePolicy
