const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "0aff715b9f661a10ab75bd8bc5075ef9";

app.use(express.static(__dirname+"/public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.send('abc');
//   res.render("index", { weather: null, error: null });
});

app.post("/", function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error, please try again"
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${
          weather.name
        }!`;
        res.render("index", { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
// const request = require('request');
// const express = require('express');
// const bparse = require('body-parser');

// const app = express()

// // app.use(express.static(__dirname+'/public'));

// app.use(bparse.urlencoded({ extended: true}));

// app.set('view engine','ejs');

// const apiKey = '0aff715b9f661a10ab75bd8bc5075ef9';
// // let city = 'dhaka';

// app.get('/', function (req, res) {
// //   res.send('Hello World!')
//     res.render('index',{ message: 'Enter a city name to get weather report'});
// });

// app.post('/', function(req, res){
//     let city = req.body.city;
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     request(url, function(err, resp, body){
//         if(err){
//             console.log('err: '+err);
//             res.render('index',{ message: 'There is an error. Enter another city name to get weather report'});
//         }
//         else{
//             console.log('body: '+body);
//             body = JSON.parse(body);
//             res.render('index',{ message: body});
// //            res.send(body);
//         }
//     });

// //     //res.render('index');
// //     console.log(req.body.city);
// })

// app.get('/temp',function(req, res){
//     console.log('temp route called');
//     res.send(`You will get temp in future here.`);
// })

// app.listen(8000, function () {
//   console.log('Example app listening on port 8000!')
// });
