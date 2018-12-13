import React, { Component } from 'react';
import './LeaveDetails.css';
class LeaveDetails extends Component {
  render () {
    return (
      <div id='leaveList'>
        <p>
          <h1>Casual Leave</h1>

          <li>
            Casual Leave Casual Leave(CL) are granted for certain unforeseen
            situation or were you are require to go for one or two days leaves
            to attend to personal matters and not for vacation.
          </li>
          <li>
            The 12 days of leave are calculated as 12 casual leaves (limited to
            1 day in a month)
          </li>
          <li>
            In such cases the person has to take the permission in advance.
          </li>
          <li>
            In case of more than 3 days leave, it should be taken as LOP(Loss of
            Pay).
          </li>
          <li>If taking 3 leaves together Need to apply before.</li>
          <li> Casual leave is not encashable.</li>
          <li>
            At the end of the year unused Casual Leaves lapse automatically.
          </li>
          <li>
            If you have joined during the middle of the year say Jul 1, your
            casual leave will half ( pro-rated) from the date you start
            employment through December 31 of that calendar year.
          </li>
        </p>
        <h1>Sick Leave</h1>
        <p>
          <li>
            Sick leave is the leave that an employee can avail when he/she is
            out of work due to illness.
          </li>
          <li>
            Sick Leave can be taken for minimum 0.5 to maximum 3 days (paid) .
          </li>
          <li> There are no sick leave carry-forwards.</li>
          <li>
            At the end of calendar year any available sick leave will lapse
            automatically.
          </li>
          <li>
            For all absences exceeding 2 or 3 days, depending on company policy,
            usually medical certificate needs to be enclosed. Sick Leave can be
            appended with Loss of Pay.
          </li>
        </p>
        <p>
          <h1>Maternity Leave</h1>
          <li>
            Female employees are entitled to a maximum of 24 weeks (180 days)
            paid maternity leave.
          </li>
          <li>
            Twenty four weeks leave has to be taken after the actual date of
            delivery A woman worker is entitled to maternity benefit only if she
            has worked at least 80 days in an establishment in the 12 months
            prior to her expected date of delivery In case of miscarriage or
            medical termination of pregnancy, an employee is entitled to twenty
            four weeks of paid maternity leave.
          </li>
          <li>
            Employees are also entitled to one additional month of paid leave in
            case of complications arising related to pregnancy, delivery,
            premature birth, miscarriage, medical termination or a tubectomy
            operation (two weeks in this case) No pregnant woman can, on a
            request made by her in this behalf, be required by her employer to
            do any work (during 10 weeks before her expected delivery) which is
            of an arduous nature or which involves long hours of standing, or
            which in any way is likely to interfere with her pregnancy or the
            normal development of the fetus, or is likely to cause her
            miscarriage or otherwise to adversely affect her health.
          </li>
        </p>
        <p>
          <h1>Vacation Leave/Medical Leave</h1>
          <li>
            An eligible employee may earn up to 9 days in each calendar year.
          </li>
        </p>
      </div>
    )
  }
}

export default LeaveDetails
