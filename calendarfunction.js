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

