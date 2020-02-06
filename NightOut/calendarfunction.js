var app = {
  settings: {
    container: $('.calendar'),
    calendar: $('.front'),
    days: $('.weeks span'),
    form: $('.back'),
    input: $('.back input'),
    buttons: $('.back button')
  },

  init: function () {
    instance = this;
    settings = this.settings;
    this.bindUIActions();
  },

  swap: function (currentSide, desiredSide) {
    settings.container.toggleClass('flip');

    currentSide.fadeOut(900);
    currentSide.hide();

    desiredSide.show();
  },

  bindUIActions: function () {
    settings.days.on('click', function () {
      const dateSpan = document.querySelector
      console.log($(this).attr("data-TMDate"))

      instance.swap(settings.calendar, settings.form);
      settings.input.focus();
    });

    settings.buttons.on('click', function () {
      instance.swap(settings.form, settings.calendar);
    });
  }
}

app.init();

var now = moment()
var month = moment().format("MMMM")
var date = moment().format('dddd Do')
console.log(month)

// Month Array Using Moment

for (var i = 1; i < 12; i++) {

  var increasemonthArray = [moment().format("MMMM"),
  moment().add(1, "month").format("MMMM"),
  moment().add(2, "month").format("MMMM"),
  moment().add(3, "month").format("MMMM"),
  moment().add(4, "month").format("MMMM"),
  moment().add(5, "month").format("MMMM"),
  moment().add(6, "month").format("MMMM"),
  moment().add(7, "month").format("MMMM"),
  moment().add(8, "month").format("MMMM"),
  moment().add(9, "month").format("MMMM"),
  moment().add(10, "month").format("MMMM"),
  moment().add(11, "month").format("MMMM")]

}
var currentmonthIndex = 0;

$(".currentMonth").html("<h2>" + increasemonthArray[currentmonthIndex] + "</h2>")

$(".addMo").on("click", function () {
  currentmonthIndex++;
  if (currentmonthIndex <= 11) {
    $(".currentMonth").html("<h2>" + increasemonthArray[currentmonthIndex] + "</h2>")
    console.log(currentmonthIndex)
  }

})

$(".subtractMo").on("click", function () {
  currentmonthIndex--;
  if (currentmonthIndex >= 0) {
    $(".currentMonth").html("<h2>" + increasemonthArray[currentmonthIndex] + "</h2>")

  }
})

$(".dayofMonth").html(date)
console.log(increasemonthArray)

// DOM Elements


var searchButton = $('#run-search')

function buildQueryURL() {
  var queryURL = "http://app.ticketmaster.com/discovery/v2/events.json?size=20"
  var searchTerms = ["&"]
  var apikey = "apikey=eXrkpUbuyRrUX1qzVXjrBbOpahQJEYLI"
  var city = "city=" +
    $('.citySearch')
      .val()
      .trim()
      .toLowerCase()

  var searchDateStart = moment().day(5).format("YYYY-MM-DD")
  var searchDateEnd = moment().day(7).format("YYYY-MM-DD")

  var searchDateString = searchTerms + "startDateTime=" + searchDateStart + "T18:00:00Z" + searchTerms + "endDateTime=" + searchDateEnd +"T01:00:00Z"

    console.log(searchDateStart)
    console.log(searchDateEnd)
    console.log(searchDateString)

  var newQueryUrl = queryURL + searchTerms + apikey + searchTerms + city + searchDateString


  var sports = document.getElementById("sportsCheck")
  var music = document.getElementById("musicCheck")
  var theater = document.getElementById("theaterCheck")

  console.log(sports.checked)
  console.log(music.checked)
  console.log(theater.checked)

  if (sports.checked) {

    newQueryUrl += "&keyword=sports"
  } if (music.checked) {

    newQueryUrl += "&keyword=music"
  } if (theater.checked) {

    newQueryUrl += "&keyword=theater"
  }
  console.log(newQueryUrl)
  return newQueryUrl;

  console.log(newUrl)
  // return queryURL + searchTerms + $.param(queryParams)



}

$(".searchButton").on("click", function () {

  var queryURL = buildQueryURL();
  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    }
  });
  event.preventDefault();





})





