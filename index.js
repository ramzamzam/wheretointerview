const express = require('express');
const { getSortedFlights } = require('./search-service')

const app = express();

app.get('/flights', (req, res) => {
  // return res.json({q: req.query})
  const { minTime, maxTime, minDuration, maxDuration, prefCarriers } = req.query;

  const flights = getSortedFlights({
    minTime: Date.parse(minTime),
    maxTime: Date.parse(maxTime),
    minDuration: minDuration,
    maxDuration: maxDuration,
    prefCarriers: prefCarriers.split(',')
  });
  return res.json(flights);
});

app.listen(3000, (err) => {
  if(err) console.error(err);
})