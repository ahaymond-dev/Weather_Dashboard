const cities = [];

function displayWeather() {
    const city = $("#city-input").val().trim();
    const key = "78a2773e0a415d0cc1dabef778996428"
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          console.log(response.weather[0].icon);
          $(".weather-view").empty();
        const weatherDiv = $("<div class='weatherDiv'>");
          const currentCity = response.name;
          const icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
          const date = new Date()
          const month = date.getMonth + 1;
          const day = date.getDay;
          const year = date.getFullYear;
          const cityName = $("<h2>").text(currentCity);
          
          cityName.append(icon);
          
          

          weatherDiv.append(cityName);

          const tempNow = response.main.temp;

          const tempF = Math.floor(tempNow * 9/5 - 459.67);

          const tempP = $("<p>").text("Temperature: " + tempF + "°F");

          weatherDiv.append(tempP);

          const humidNow = response.main.humidity;

          const humidP = $("<p>").text("Humidity: " + humidNow + "%");

          weatherDiv.append(humidP);

          const windNow = response.wind.speed;

          const windP = $("<p>").text("Wind Speed: " + windNow + "mph");

          weatherDiv.append(windP);

          $(".weather-view").prepend(weatherDiv);


      });
    
}

const renderButtons = function(){
  $("#city-buttons").empty();

for (let i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array  https://cors-anywhere.herokuapp.com/
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    const a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("city-btn");
    a.addClass("btn");
    a.addClass("btn-secondary")
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#city-buttons").append(a);
    const br = $("<br>");
    $(a).append(br);
  };


// This function handles events where a movie button is clicked
$("#add-city").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  const search = $("#city-input").val().trim();

  // Adding movie from the textbox to our array
  cities.push(search);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  console.log(cities);
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".city-btn", displayWeather);
};
// Calling the renderButtons function to display the initial buttons
renderButtons();
console.log(cities);