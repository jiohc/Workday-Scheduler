
var saveBtn = $(".saveBtn");


// current day 
$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

// current time
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime() {
    var today = new Date();
    var hours = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();
    
    // convert 24 hour time to 12 hour time with AM/PM
    var session = ' AM'
    if(hours === 0) {
        hours = 12;
    }
    if(hours > 12) {
        hours = hours - 12;
        session = ' PM'
    }
    
    mins = checkTime(mins);
    secs = checkTime(secs);
    document.getElementById('time').innerHTML = hours + ":" + mins + ":" + secs + session;
    t = setTimeout(function() {
      startTime()
    }, 500);
  }

  

// each time row color coded for past, present, future
function timeBlockColor() {
    var hour = moment().hours();

    $(".time-block").each(function() {
        var currHour = parseInt($(this).attr("id"));

        if (currHour > hour) {
            $(this).addClass("future");
        } else if (currHour === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};

// save button for that time block
saveBtn.on("click", function() {
    
    var time = $(this).siblings(".hour").text();
    var plan = $(this).siblings(".plan").val();

    // event is saved in local storage
    localStorage.setItem(time, plan);
});


// saved events
function usePlanner() {

    $(".hour").each(function() {
        var currHour = $(this).text();
        var currPlan = localStorage.getItem(currHour);

        if(currPlan !== null) {
            $(this).siblings(".plan").val(currPlan);
        }
    });
}

// call functions

startTime()
timeBlockColor();
usePlanner();
