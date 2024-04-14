// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const employeeRecord = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}


function createEmployeeRecords(arrayOfArrays) {
    const arrayOfEmployees = []
    arrayOfArrays.forEach(array => {
        const employee = createEmployeeRecord(array)
        arrayOfEmployees.push(employee)
    })
    return arrayOfEmployees
}

function createTimeInEvent(employeeRecordObj, timeInString) {
    const date = timeInString.substr(0, 10)
    const time = timeInString.substr(11)
    const parsedTime = parseInt(time)
    const timeInEvent = {
        type: "TimeIn",
        hour: parsedTime,
        date: date
    }
    employeeRecordObj.timeInEvents.push(timeInEvent)
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, timeInString) {
    const date = timeInString.substr(0, 10)
    const time = timeInString.substr(11)
    const parsedTime = parseInt(time)
    const timeOutEvent = {
        type: "TimeOut",
        hour: parsedTime,
        date: date
    }
    employeeRecordObj.timeOutEvents.push(timeOutEvent)
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, dateString) {
    const foundTimeInEvent = employeeRecordObj.timeInEvents.find(timeInObj => {
        return timeInObj.date === dateString
    })
    const foundTimeOutEvent = employeeRecordObj.timeOutEvents.find(timeOutObj => {
        return timeOutObj.date === dateString
    })

    const hoursWorked = (foundTimeOutEvent.hour - foundTimeInEvent.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecordObj, dateString) {
    const hoursWorked = hoursWorkedOnDate(employeeRecordObj, dateString)
    const employeeWage = employeeRecordObj.payPerHour
    return hoursWorked * employeeWage
}

function allWagesFor(employeeRecordObj) {
    const arrayOfDatesWorked = employeeRecordObj.timeInEvents.filter(timeInObj => {
        return timeInObj.date
    })
    let totalWagesEarned = 0
    arrayOfDatesWorked.forEach(dateWorked => {
        const wagesOfDayWorked = wagesEarnedOnDate(employeeRecordObj, dateWorked.date)
        totalWagesEarned += wagesOfDayWorked
    })
    return totalWagesEarned
}

function calculatePayroll(arrOfEmployeeObjs) {
    let payrollSum = 0
     arrOfEmployeeObjs.forEach(employee => {
        const employeeWagesTotal = allWagesFor(employee)
        return payrollSum += employeeWagesTotal
    })
    return payrollSum
}

