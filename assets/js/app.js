
var fullDay  = [
  {
      id: "0",
      hour: "09",
      time: "09",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "1",
      hour: "10",
      time: "10",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "2",
      hour: "11",
      time: "11",
      meridiem: "am",
      reminder: ""
  },
  {
      id: "3",
      hour: "12",
      time: "12",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "4",
      hour: "01",
      time: "13",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "5",
      hour: "02",
      time: "14",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "6",
      hour: "03",
      time: "15",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "7",
      hour: "04",
      time: "16",
      meridiem: "pm",
      reminder: ""
  },
  {
      id: "8",
      hour: "05",
      time: "17",
      meridiem: "pm",
      reminder: ""
  },
  
]

function todaysDate() {
  var currentHeaderDate = moment().format('dddd, MMMM Do');
  $("#currentDay").text(currentHeaderDate);
}

function saveMyPlans() {
  localStorage.setItem("fullDay", JSON.stringify(fullDay));
}

function displayPlans() {
  fullDay .forEach(function (_currentHour) {
      $(`#${_currentHour.id}`).val(_currentHour.reminder);
  })
}

function init() {
  var savedData = JSON.parse(localStorage.getItem("fullDay"));

  if (savedData) {
      fullDay  = savedData;
  }

  saveMyPlans();
  displayPlans();
}

todaysDate();

fullDay .forEach(function(currentHour) {
 
  var hoursRow = $("<form>")
    .attr({
        "class": "row"
    });
      
  $(".container").append(hoursRow);

  var hourSpace = $("<div>")
      .text(`${currentHour.hour}${currentHour.meridiem}`)
      .attr({
          "class": "col-md-2 hour"
        });
          
  var hourData = $("<div>")
      .attr({ 
          "class": "col-md-9 description p-0"
        });
         
  var textSpace = $("<textarea>");
  hourData.append(textSpace);
  textSpace.attr("id", currentHour.id);
  if (currentHour.time < moment().format("HH")) {
      textSpace.attr ({
          "class": "past", 
      })
  } else if (currentHour.time === moment().format("HH")) {
      textSpace.attr({
          "class": "present"
      })
  } else if (currentHour.time > moment().format("HH")) {
      textSpace.attr({
          "class": "future"
      })
  }

  var saveButton = $("<i class='far fa-save fa-lg'></i>")
  var savePlan = $("<button>")
      .attr({
          "class": "col-md-1 saveBtn"
  });
  savePlan.append(saveButton);
  hoursRow.append(hourSpace, hourData, savePlan);
})

init();

$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  var saveIndex = $(this).siblings(".description").children(".future").attr("id");
  fullDay [saveIndex].reminder = $(this).siblings(".description").children(".future").val();
  
  saveMyPlans();
  displayPlans();
})