/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(personArray) {
    let employeeRecordObj = {
        firstName: personArray[0],
        familyName: personArray[1],
        title: personArray[2],
        payPerHour: personArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecordObj
}

function createEmployeeRecords(arrayOfPersonArrays) {
    let arrayOfEmployeeObjects = arrayOfPersonArrays.map(createEmployeeRecord)
    return arrayOfEmployeeObjects
}

let createTimeInEvent = function(dateStamp) {
    let splitDate = dateStamp.split(" ")
    this.timeInEvents = [...this.timeInEvents, {
        type: "TimeIn",
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }]
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let splitDate = dateStamp.split(" ")
    this.timeOutEvents = [...this.timeOutEvents, {
        type: "TimeOut",
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }]
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeInObj = this.timeInEvents.find((timeInEventsObj) => {
        return (timeInEventsObj.date === date)
    })
    let timeOutObj = this.timeOutEvents.find((timeOutEventsObj) => {
        return (timeOutEventsObj.date === date)
    })
    let timeIn = timeInObj.hour
    let timeOut = timeOutObj.hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked 
}

let wagesEarnedOnDate = function(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)
    let wagesEarned = (hoursWorked*this.payPerHour)
    return wagesEarned
}

let findEmployeeByFirstName = function(arrayOfEmployeeRecords, searchName) {
    let searchResult = arrayOfEmployeeRecords.find((employeeRecordObj) => {
        return (employeeRecordObj.firstName === searchName)
    })
    return searchResult
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    let arrayOfWages = []
    arrayOfEmployeeRecords.forEach((employeeRecordObj) => {
    let employeeWages = allWagesFor.call(employeeRecordObj)
    arrayOfWages = [...arrayOfWages, employeeWages]
    })
    let totalWages = arrayOfWages.reduce((totalAmount, wages) => {return totalAmount + wages})
    return totalWages
    }