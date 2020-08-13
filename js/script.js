
$(document).ready(function() {
	
	var longitude, latitude;
	var temperatureActualFlag = true;
	var fahrenheitValue = 0;
	var horaAtual = new Date().getHours();
	var apiURL = "https://fcc-weather-api.glitch.me/api/current?"
    console.log(horaAtual);

	if (horaAtual < 6 || horaAtual > 17) { //É noite
		$("body").fadeIn("slow", function() {
			$(this).addClass("night");
		});
	} else {
		$("body").addClass("day");
	}

(function getLocation() {
    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(function(position) {
        		longitude = position.coords.longitude;
        		latitude = position.coords.latitude;
        		console.log(longitude + " " + latitude);

        		$.getJSON(apiURL + "lat=" + latitude + "&lon=" + longitude, 
        			function(result) {
        				$(".display-3").text("Local Weather App");
        				$("#city").text(result.name);
        				$("#temperature").html(Math.floor(result.main.temp) + " °<a href='#' id='temperatureType'>C</a>");
        				$("#weather").text(result.weather[0].main);
        				$("#icon").attr("src", result.weather[0].icon).toggleClass("icon-hide");

        				$("#temperature").on("click", "#temperatureType", function() {  
								if (temperatureActualFlag) { //Changing to Fahrenheit									
									fahrenheitValue = Math.floor((9 * result.main.temp + 160) / 5);
									$("#temperature").html(fahrenheitValue + " °<a href='#' id='temperatureType'>F</a>");
                                    temperatureActualFlag = !temperatureActualFlag;
								} else { //Changing to Celsius							
									$("#temperature").html(Math.floor(result.main.temp) + " °<a href='#' id='temperatureType'>C</a>");
									temperatureActualFlag = !temperatureActualFlag;
								}
						});

        			})
        	})

    } else {
    	console.log("Geolocation is not supported by this browser.");
    }
})();


$(document).ajaxStart(function() {
    $('img#loading').show(); // show the gif image when ajax starts
}).ajaxStop(function() {
    $('img#loading').hide(); // hide the gif image when ajax completes
});

   
});
