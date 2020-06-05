const HTTPS = require("https");
const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");

const APP = EXPRESS();
var port = 3000;

APP.use(BODY_PARSER.urlencoded({extended:true}));

APP.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

APP.post("/", function(req, res) {
  const city = req.body.cityName
  var apiKey = "30fe495dae8b4c3f453f0cb82c846a92";
  var units = "imperial";
  const url = "HTTPS://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

  HTTPS.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const WEATHER = JSON.parse(data);
      const TEMP = WEATHER.main.temp;
      const DESCRIPTION = WEATHER.weather[0].description;
      const ICON = WEATHER.weather[0].icon;
      const ICON_URL = "http://openweathermap.org/img/wn/" + ICON + "@2x.png"


      res.write("<h1>Temperature: " + TEMP + "</h1>");
      res.write("<p>The weather in " + city + " is currently " + DESCRIPTION + "</p>")
      res.write("<img src=" + ICON_URL + ">");
      res.send();
    });


  });
});



APP.listen(port, function() {
  console.log("Listening on port " + port + ".");
});
