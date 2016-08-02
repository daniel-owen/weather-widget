$(document).ready(function(){
	var apiKey = 'dae085b551a19d6f0db3512e8e6ba9c9';
	var canvas = document.getElementById('current-temp');
	var context = canvas.getContext('2d');
	var currentTemp = 0;
	var icon = '';


	$('.weather-form').submit(function(){
		event.preventDefault(); // keep the form from submitting

		var cityText = $('.city').val(); // get the user input

		// build URL from the user input and our API key
		var url = 'http://api.openweathermap.org/data/2.5/forecast/city?q='+cityText+',us&units=imperial&APPID=' + apiKey;

		//get the JSON from the constructed URL
		$.getJSON(url, function(weatherData){
			console.log(weatherData);
			// set up a variable for the user's city's temp
			currentTemp = Math.round(weatherData.list[0].main.temp);
			console.log(currentTemp);
			icon = weatherData.list[0].weather[0].icon;
			context.clearRect(0, 0, 300, 300); // make sure the canvas is empty
			drawGuage();
		}); // end get JSON
	}); // end submit


	function drawGuage(){

		context.fillStyle = '#0075F4';
		context.beginPath();
		context.arc(150, 150, 65, Math.PI * 0, Math.PI * 2);
		context.fill();

		var img = new Image();
		var iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';
		img.src = iconURL;
		context.drawImage(img, 125, 100);

		context.textAlign = 'center';
		context.font = '30px Arial';
		context.fillStyle = '#000000';
		context.fillText(currentTemp+'\xB0', canvas.width/2, canvas.height/1.65);

		drawNeedle(0);
	} // end drawGuage


	function drawNeedle(current){

		var tempColor = '#FF0000';
		context.strokeStyle = tempColor;
		context.lineWidth = 10;
		context.beginPath(); // so I'm ready to draw
		context.arc(150, 150, 70, Math.PI * 1.5, (current / 100) * (Math.PI * 2) + (Math.PI*1.5)); // starts and ends at pi*1.5
		context.stroke(); // draw the circle

		current++;
		if(current < currentTemp){
			requestAnimationFrame(function(){
				drawNeedle(current);
			})
		}
	} // end drawNeedle
}); // end document ready