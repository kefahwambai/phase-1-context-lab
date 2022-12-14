function createEmployeeRecord(details) {
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

function createEmployeeRecords(records) {
    return records.map(record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent( dateStamp)  {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return this
}

function createTimeOutEvent(dateStamp)  {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return this
}

function hoursWorkedOnDate(date) {
    return (this.timeOutEvents.find(event => {
        if(event.date === date) {
            return true
        }
    }).hour - this.timeInEvents.find(event => {
        if(event.date === date) {
            return true
        }
    }).hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour
}

function allWagesFor() {
    return this.timeInEvents.reduce((accumulator, currentEvent) => {
        return accumulator + wagesEarnedOnDate.call(this , currentEvent.date)
    }, 0)
}

function calculatePayroll(records) {
    return records.reduce((accumulator, employee) => {
        return accumulator + allWagesFor.call(employee)
    }, 0)
}

function findEmployeeByFirstName(records, firstName) {
    return records.find(element => {
        if(element.firstName === firstName) {

            return true
        }
    })
}