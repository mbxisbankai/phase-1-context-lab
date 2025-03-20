/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    let newArray = [];
    
    array.forEach(record => {
        let newRecord = createEmployeeRecord(record);
        newArray.push(newRecord);
    })
    return newArray;
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: Math.round(hour),
        date: date
    })
    return this;
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Math.round(hour),
        date: date
    })
    return this;
}

function hoursWorkedOnDate(dateStamp){
    let timeIn = this.timeInEvents.find(event => event.date === dateStamp);
    let timeOut = this.timeOutEvents.find(event => event.date === dateStamp);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}

function calculatePayroll(array) {
    let payroll = array.reduce((total, employee) => total + allWagesFor.call(employee), 0);
    return payroll;
}
