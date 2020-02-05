var app = {
	settings: {
		container: $('.calendar'),
		calendar: $('.front'),
		days: $('.weeks span'),
		form: $('.back'),
		input: $('.back input'),
		buttons: $('.back button')
	},

	init: function() {
		instance = this;
		settings = this.settings;
		this.bindUIActions();
	},

	swap: function(currentSide, desiredSide) {
		settings.container.toggleClass('flip');

		currentSide.fadeOut(900);
		currentSide.hide();

		desiredSide.show();
	},

	bindUIActions: function() {
		settings.days.on('click', function(){
			instance.swap(settings.calendar, settings.form);
			settings.input.focus();
		});

		settings.buttons.on('click', function(){
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
    
    
    $(searchButton).on("click", function () {
      var cityInput = $("#citySearch").val()
      
      console.log(cityInput)


    })


// Ajax Calls from Ticketmaster

	// queryURL is the url we'll use to query the API
	var urlkey =  "eXrkpUbuyRrUX1qzVXjrBbOpahQJEYLI"
	var queryURL = "http://app.ticketmaster.com/discovery/v2/events.json?apikey=" + urlkey;
  
	// Begin building an object to contain our API call's query parameters
	// Set the API key

	console.log(queryURL)


// Event Listener from Page
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then (function(response){
	  console.log(response)
	  $('.event-panel').html("<h2>" + "Name: " + response._embedded.events[0].name +"</h2>" +
	  "<h2>" + "City: " + response._embedded.events[0]._embedded.venues[0].city.name + "</h2>" +
	  "<h2>" + "City: " + response._embedded.events[0]._embedded.venues[0].city.name + "</h2>")
  })


 // _embedded.events[""0""]._embedded.venues[""0""].city.name

// _embedded.events[""0""]._embedded.venues[""0""].location.longitude

// _embedded.events[""0""]._embedded.venues[""0""].location.latitude

