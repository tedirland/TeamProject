// DOM Elements


var searchButton = $('#run-search')

function buildQueryURL() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&sort=random"
  var searchTerms = ["&"]
  var apikey = "apikey=eXrkpUbuyRrUX1qzVXjrBbOpahQJEYLI"
  var city = "city=" +
    $('.citySearch')
      .val()
      .trim()
      .toLowerCase()


  var thisWeekend = document.getElementById("thisWknd")
  var nextWeekend = document.getElementById("nextWknd")
  var nextWkndsearchDateStart = moment().add(1, 'week').day(5).format("YYYY-MM-DD")
  var nextWkndsearchDateEnd = moment().add(1, 'week').day(7).format("YYYY-MM-DD")
  var searchDateStart = moment().day(5).format("YYYY-MM-DD")
  var searchDateEnd = moment().day(7).format("YYYY-MM-DD")

  console.log(thisWeekend.checked)
  console.log(nextWeekend.checked)
  // var searchDateString = searchTerms + "startDateTime="


  if (thisWeekend.checked) {


    var searchDateString = searchTerms + "startDateTime=" + searchDateStart + "T18:00:00Z" + searchTerms + "endDateTime=" + searchDateEnd + "T01:00:00Z"



  } if (nextWeekend.checked) {

    var searchDateString = searchTerms + "startDateTime=" + nextWkndsearchDateStart + "T18:00:00Z" + searchTerms + "endDateTime=" + nextWkndsearchDateEnd + "T01:00:00Z"


  }

  console.log(searchDateString)

  
  
  var sports = document.getElementById("sportsCheck")
  var music = document.getElementById("musicCheck")
  var theater = document.getElementById("theaterCheck")
  
  
  var category = " "
  if (sports.checked) {
    
    category = "&keyword=sports"
  } if (music.checked) {
    
    category = "&keyword=music"
  } if (theater.checked) {
    
    category = "&keyword=theater"
  }
  var newQueryUrl = queryURL + searchTerms + apikey + searchTerms + city + searchDateString + category
  console.log(newQueryUrl)
  return newQueryUrl;
  
  console.log(newUrl)

}
// Event Listener for the search button to run the AJAX call
$(".searchButton").on("click", function () {

  var queryURL = buildQueryURL();
  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      console.log(json._embedded)
      
      var responseLength = json._embedded.events.length

      $('.accordion').html(

        "<h2>" + "Check It Out: We found " + responseLength + " events for you this weekend!" + "</h2>" + 
        "<button class='btn btn-danger>" + "Start Over"

      )

      // For Loop to assign variables to JSON Response Building Blocks, render to page

      for (var i = 0; i < responseLength; i++) {
        // JSON Element Building Blocks
        var eventName = json._embedded.events[i].name
        var eventImage = json._embedded.events[i].images[i].url
        var venueName = json._embedded.events[i]._embedded.venues[0].name
        var venueCity = json._embedded.events[i]._embedded.venues[0].city.name
        var venueState = json._embedded.events[i]._embedded.venues[0].state.stateCode
        var venueZip = json._embedded.events[i]._embedded.venues[0].postalCode
        var venueAddress = json._embedded.events[i]._embedded.venues[0].address.line1 + " " + venueCity + "," + " " + venueState + " " + venueZip
        // Use moment to normalize time returned from JSON object (24H time --> 12 HR)
        var startTime = moment(json._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("h:mm A")
        // Use Moment to normalize event date returned from JSON object
        var eventDate = moment(json._embedded.events[i].dates.start.localDate).format("dddd, MMMM, Do, YYYY")
       // Lat and Long vars from JSON object
        var lng = json._embedded.events[i]._embedded.venues[0].location.longitude
        var lat = json._embedded.events[i]._embedded.venues[0].location.latitude

        //Setting up arrays for the purposes of dynamically rendering accordian elements on page (should have used an object) 

        var foundationArray = ["collapseOne", "collapseTwo", "collapseThree", "collapseFour", "collapseFive"]
        var dataTarget = ["#collapseOne", "#collapseTwo", "#collapseThree", "#collapseFour", "#collapseFive"]
        var headingArray = ["headingOne", "headingTwo", "headingThree", "headingFour", "headingFive"]
        // Dynamically generated content that displays the JSON response building blocks to the page
        $('.accordion').append(
          "<div class = 'card'>" +
          "<div class= 'card-header' id =" + headingArray[i] + ">" +
          "<h2 class='mb-0'>" +
          "<button class='btn btn-link' type='button' data-toggle='collapse' data-target=" + dataTarget[i] + " aria-expanded='true' aria-controls=" + foundationArray[i] + ">" +
          parseInt(i + 1) + "." + eventName +
          "</button>" +
          "</h2>" +
          "</div>" +
          "</div>" +
          "<div id=" + foundationArray[i] + ' ' + "class='collapse' aria-labelledby=" + headingArray[i] + " data-parent='#accordionExample'>" +
          "<div class='card-body'>" +
          "<img class='thumbnail' src=" + eventImage + ">" +
          "<h4>" + "When: " + eventDate + " " + "at" + " " + startTime +
          "<h5>" + "Where: " + venueName + " " + "||" + " " + "<i>" + venueAddress + " <br> " +
          "<a href='map.html?lng="+lng+"&lat="+lat+"' class='button' id='eventSelect' data-lng =" + lng + " " + "data-lat=" + lat + "target='_blank'>" + "I'm In" + "</a>" +
          "</div>" +
          "</div>" +
          "</div>"
          
        )
      } 
      //Event Listener for the dynamically generated button on each event to grab coords and open the map 
      $(".button").on("click", function () {

        var selectedVenueLng = $(this).attr("data-lng")

        var selectedVenueLat = $(this).attr("data-lat")


      })
    },
    error: function (xhr, status, err) {
     
    }
  });
  event.preventDefault();





})





