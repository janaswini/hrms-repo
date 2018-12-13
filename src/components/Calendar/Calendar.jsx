import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Popup from 'reactjs-popup'
import FullCalendar from 'fullcalendar-reactwrapper';
import '../../../node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import './Calendar.css'
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    display:'none',
    empName:'',
    fromDate:'',
    toDate:'',
    noOfDays:'',
    reason:'',
    status:'',
    left:'',
    top:'',
    requestId:'',
    calendarData:[],
    myLeavesData:[]
    }
    this.calendarData=this.calendarData.bind(this)
    this.myLeavesData=this.myLeavesData.bind(this)
  }


  // Reduce number of days from employee's pending leaves, if request is approved
  reduceLeaves (id, type, days) {
    let empl = JSON.parse(localStorage.getItem('Data'))
    let  data = empl.Employee
    let leave, leave1, leave2, leave3
    let newState = Object.assign({}, empl)

    for (var i = 0; i < data.length; ++i) {
      if (data[i].EmpId === id) {
        leave = data[i].PendingLeaves.Planned
        leave1 = data[i].PendingLeaves.EmergencyLeave
        leave2 = data[i].PendingLeaves.Sick
        leave3 = data[i].PendingLeaves.Privilege
        if (type === 'Casual Leave') {
          leave = leave - days
          leave > 0 ? leave = leave : leave = 0
          newState.Employee[i].PendingLeaves.Planned = leave
        }
        if (type === 'Emergency Leave') {
          leave1 = leave1 - days
          leave1 > 0 ? leave1 = leave1 : leave1 = 0
          newState.Employee[i].PendingLeaves.EmergencyLeave = leave1
        }
        if (type === 'Sick Leave') {
          leave2 = leave2 - days
          leave2 > 0 ? leave2 = leave2 : leave2 = 0
          newState.Employee[i].PendingLeaves.Sick = leave2
        }
        if (type === 'Earned Leave') {
          leave3 = leave3 - days
          leave3 > 0 ? leave3 = leave3 : leave3 = 0
          newState.Employee[i].PendingLeaves.Privilege = leave3
        }
        localStorage.setItem('Data', JSON.stringify(newState))
      }
    }
    localStorage.setItem('Data', JSON.stringify(newState))
  }

  // Reduce number of days from employee's pending leaves, if request is approved
  addLeaves (id, type, days) {
    let empl = JSON.parse(localStorage.getItem('Data'))
    let data = empl.Employee
    let leave, leave1, leave2, leave3
    let newState = Object.assign({}, empl)

    for (var i = 0; i < data.length; ++i) {
      if (data[i].EmpId === id) {
        leave = data[i].PendingLeaves.Planned
        leave1 = data[i].PendingLeaves.EmergencyLeave
        leave2 = data[i].PendingLeaves.Sick
        leave3 = data[i].PendingLeaves.Privilege
        if (type === 'Casual Leave') {
          leave = leave + days
          newState.LeaveRecord.Employee[i].PendingLeaves.Planned = leave
        }
        if (type === 'Emergency Leave') {
          leave1 = leave1 + days
          newState.Employee[i].PendingLeaves.EmergencyLeave = leave1
        }
        if (type === 'Sick Leave') {
          leave2 = leave2 + days
          newState.Employee[i].PendingLeaves.Sick = leave2
        }
        if (type === 'Earned Leave') {
          leave3 = leave3 + days
          newState.Employee[i].PendingLeaves.Privilege = leave3
        }
      }
    }
    localStorage.setItem('Data', JSON.stringify(newState))
  }


  changeToReject (e) {
    var calendarDataVar=JSON.parse(localStorage.getItem('Data'))
    let newState = Object.assign({}, calendarDataVar)
    calendarDataVar.leaveRequest.map((data,i) => {
      if(data.ReqestId === this.state.requestId){
        newState.leaveRequest[i].status = 'Rejected'
        localStorage.setItem('Data',JSON.stringify(newState))
        this.addLeaves(data.EmpId,data.LeaveType,data.TotalDays)
        window.location.replace('/calendar')
      }
    });
  }

  changeToApprove (e) {
    var calendarDataVar=JSON.parse(localStorage.getItem('Data'))
    let newState = Object.assign({}, calendarDataVar)
    calendarDataVar.leaveRequest.map((data,i) => {
      if(data.ReqestId === this.state.requestId){
        newState.leaveRequest[i].status = 'Approved'
        localStorage.setItem('Data',JSON.stringify(newState))
        this.reduceLeaves(data.EmpId,data.LeaveType,data.TotalDays)
        window.location.replace('/calendar')
      }
    });
  }
  // myLeavesData(){
  //   var employeeId=JSON.parse(localStorage.getItem('currentUserId'))
  //   var myLeavesVar=JSON.parse(localStorage.getItem('Data'))
  //   myLeavesVar=myLeavesVar.Employee
  //   // console.log(JSON.stringify(myLeavesVar)+'myLeavesVar')
  //   myLeavesVar.forEach(element => {
  //     if(JSON.stringify(element.EmpId) === JSON.stringify(employeeId) )
  //     console.log('element'+JSON.stringify(element.leaveTaken))
  //     this.setState({myLeavesData : this.state.myLeavesData=element.leaveTaken})
  //     console.log('leaveTaken'+this.state.myLeavesData)
  //   });
  // }
  myLeavesData(){
    console.log('myleaves data')
    var employeeId=JSON.parse(localStorage.getItem('currentUserId'))
    var myLeavesData=JSON.parse(localStorage.getItem('Data'))
    myLeavesData=myLeavesData.leaveRequest
    var j=0,obj
    
    myLeavesData.forEach(i => {
      if(i.status === 'Rejected'){
      }
      console.log('i.EmpId:'+i.EmpId+'employeeId:'+employeeId)
      if(i.EmpId === employeeId){
        var endDate=new Date((i.ToDate).split("T")[0])
        endDate=endDate.setDate(endDate.getDate()+1)
        endDate=new Date(endDate)
        endDate=JSON.stringify(endDate).substr(1,10)

        obj = Object.assign ( {}, {title:i.EmpName,
         EmpId:i.EmpId, empName:i.EmpName,requestId:i.ReqestId,
         fromDate:(i.FromDate).split("T")[0],toDate:(i.ToDate).split("T")[0],
         noOfDays:i.TotalDays,className:i.status,
         reason:i.LeaveReason,status:i.status,
         start:(i.FromDate).split("T")[0], end:endDate}
         
         )
        this.state.myLeavesData[this.state.myLeavesData.length]= obj
        j++
      }
    });
    console.log('my leaves data'+this.state.myLeavesData)
  }
  calendarData(){
    var calendarData=JSON.parse(localStorage.getItem('Data'))
    calendarData=calendarData.leaveRequest
    var j=0,obj
    
    calendarData.forEach(i => {
      if(i.status === 'Rejected'){
      }

        var endDate=new Date((i.ToDate).split("T")[0])
        endDate=endDate.setDate(endDate.getDate()+1)
        endDate=new Date(endDate)
        endDate=JSON.stringify(endDate).substr(1,10)

        obj = Object.assign ( {}, {title:i.EmpName,
         EmpId:i.EmpId, empName:i.EmpName,requestId:i.ReqestId,
         fromDate:(i.FromDate).split("T")[0],toDate:(i.ToDate).split("T")[0],
         noOfDays:i.TotalDays,className:i.status,
         reason:i.LeaveReason,status:i.status,
         start:(i.FromDate).split("T")[0], end:endDate}
         
         )
        this.state.calendarData[this.state.calendarData.length]= obj
        j++
    });

  }

  popUpFunction(e,event){    
    this.setState({

      display : 'block',
      empName:e.empName,
      fromDate:e.fromDate,
      toDate:e.toDate,
      noOfDays:e.noOfDays,
      reason:e.reason,
      status:e.status,
      left:event.pageX,
      top:event.pageY,
      requestId:e.requestId

    })

  }
  closePopUp(event){
    this.setState({
      display:'none'
    })
  }
  render() {

if((this.state.myLeavesData).length===0)
this.myLeavesData()

if((this.state.calendarData).length===0)
this.calendarData()

    var employeeRole=JSON.parse(localStorage.getItem('currentUserRole'))
    return (
      <div className='componentContainer'>
        <div id='fullCalendarMainContainer'>
          <div id='fullCalendarContainer'>
            <div id="example-component">
              <FullCalendar
                  id = "calendar"
              header = {{
                  left: 'prev,next today myCustomButton',
                  center: 'title',
                  right: 'month,basicWeek,basicDay'
              }}
              defaultDate= {moment()}
              navLinks= {true} // can click day/week names to navigate views
              editable= {true}
              eventLimit= {true} 
              events = {employeeRole==='Employee'?this.state.myLeavesData:this.state.calendarData}	
              eventClick={(e,event)=>this.popUpFunction(e,event)}
              
          />

            </div>
            <div className='popUp popUpImp' 
            style= {{display:this.state.display,top:this.state.top,left:this.state.left}}
            >
            <span className='marginLeft' onClick={()=>this.closePopUp()}>X</span>
                <div>Name : {this.state.empName}</div>
                <div>From Date : {this.state.fromDate}</div>
                <div>To Date : {this.state.toDate}</div>
                <div>Total Days : {this.state.noOfDays}</div>
                <div>Reason : {this.state.reason}</div>
                <div>Status : {this.state.status}</div>
                
                {
                (employeeRole==='Employer')?
                  (this.state.status==='Approved')?
                  <button onClick={e=>this.changeToReject(e)}>Reject</button>
                  :(this.state.status==='Rejected')?
                  <button onClick={e=>this.changeToApprove(e)}>Approve</button>
                  :
                  <div>
                  <button button onClick={e=>this.changeToApprove(e)}>Approve</button>
                  <button onClick={e=>this.changeToReject(e)}>Reject</button>
                  </div>
                :
                ''
                }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar