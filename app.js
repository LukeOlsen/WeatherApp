$(document).ready(function() {
    var hereWeather = "";
    var html = "";
    var lon = "";
    var lat = "";
    var picture = "";
    var roundTemp = "";
    var cels = true;
  
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
  
        $.getJSON(
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lat +
            "&lon=" +
            lon,
          function(data) {
            var rawJson = JSON.stringify(data);
            var json = JSON.parse(rawJson);
            console.log(json);
            roundTemp = data.main.temp;
            roundTemp = roundTemp.toPrecision(3);
            html = "<div><img src='" + data.weather[0].icon + "'></div>";
            $("#weather").html(data.weather[0].description);
            $("#temperature").html(roundTemp);
            $("#icon").html(html);
            $("#city").html(data.name);
            $("#country").html(data.sys.country);
            $("#degree").on("click", function(){
              if (cels) {
                var farh = data.main.temp * 1.8 + 32;
                farh = farh.toFixed(1);
                $("#degree").text("F");
                $("#temperature").text(farh);
                cels = false;
                console.log(farh);
              } else {
                $("#degree").text("C");
                $("#temperature").text(roundTemp);
                cels = true;
              }
            });
            var temp = data.main.temp;
            console.log(temp);
          }
        );
      });
    }
  });