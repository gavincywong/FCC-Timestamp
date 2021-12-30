const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Creating the api endpoint
app.get("/api", function (req, res) {
  var date = new Date()
  res.send({unix: date.getTime(), utc: date.toUTCString()})
});

app.get("/api/:date", (req, res) => {
  var date = req.params.date
  var newDate = ''
  var unix = ''
  var utc = ''

  if (/^\d+$/.test(date)) {
    newDate = new Date(parseInt(date))
    unix = parseInt(date)
    utc = newDate.toUTCString()
  } else {
    newDate = new Date(date)
    unix = newDate.getTime()
    utc = newDate.toUTCString()
  }

  if (utc === "Invalid Date") {
    res.json({error: "Invalid Date"})
  }

  res.json({"unix": unix, "utc": utc})
})

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
