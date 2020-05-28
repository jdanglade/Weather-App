const HTTPS = require("https");
const EXPRESS = require("express");
const APP = EXPRESS();
var port = 3000;


APP.get("/", function(req, res) {
  const url = "HTTPS://api.openweathermap.org/data/2.5/weather?q=Miami&appid=30fe495dae8b4c3f453f0cb82c846a92&units=imperial";

  HTTPS.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const WEATHER = JSON.parse(data);
      const TEMP = WEATHER.main.temp;
      const DESCRIPTION = WEATHER.weather[0].description;
      res.send("<h1>" + DESCRIPTION + "</h1><h2>Temperature: " + TEMP + "</h2>");
    });
  });
});

APP.listen(port, function() {
  console.log("Listening on port " + port + ".");
});
