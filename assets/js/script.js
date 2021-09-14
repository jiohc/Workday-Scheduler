
var saveBtn = $(".saveBtn");


// current day 
$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

// each time block is color-coded to indicate whether it is in the past, present, or future
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

timeBlockColor();
usePlanner();
