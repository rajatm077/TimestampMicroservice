const moment = require('moment');
const express = require('express');

const app = express();

app.get("/api/timestamp/", (req, res) => {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  console.log('Inside api..');
  const formats =  [
    moment.ISO_8601,
    "x"
  ];  
  let date_string = req.params.date_string;
  let isValid = moment(date_string, formats, true).isValid();
  if (!isValid) {
    res.json({
      "error": "Invalid Date"
    });
  } else {
    date_string = moment(date_string, formats);
    console.log(date_string);
    res.json({
      "unix": new Date(date_string).getTime(),
      "utc": new Date(date_string).toUTCString()
    })
  } 
 
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});