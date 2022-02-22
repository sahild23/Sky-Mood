//http://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=e3d396e831706f2bb60486376c8f5229
const express = require("express");



const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({

  extended: true

}));
app.use("/public", express.static("public"));



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});



app.post("/", function(req, res) {

  console.log(req.body.cityName);

  const query = req.body.cityName;

  const appKey = "e3d396e831706f2bb60486376c8f5229";

  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;





  https.get(url, function(response) {

    console.log(response.statusCode);





    response.on("data", function(data) {

      const weatherData = JSON.parse(data)

      const temp1 = weatherData.main.temp

      const weather = weatherData.weather[0].description

      const icon = weatherData.weather[0].icon

      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"





      console.log(weather);


      res.write("<h1> The Weather is currently " + weather + "</h1>");

      res.write("<br><h1>The temperature of your location is " + temp1 + " degree celcius</h1>");

      res.write("<img src = " + imageUrl + ">");

      res.send();

    });





  });



});



app.listen(process.env.PORT || 3000, function() {

  console.log("Server is running on Sapper ");

})
