const flights = require('./gistfile1.json').map(flight => {
  flight.departureTimestamp = Date.parse(flight.departureTime);
  flight.arrivalTimestamp = Date.parse(flight.arrivalTime);
  return flight;
});


function getFlights({ minTime, maxTime, minDuration, maxDuration}) {
  const matchingFlights = flights.filter(flight => {
    const duration = flight.arrivalTimestamp - flight.departureTimestamp;
    return flight.departureTimestamp <= maxTime && flight.arrivalTimestamp >= minTime && duration >= minDuration && duration <= maxDuration;
  });
  return matchingFlights;
}

function sortFlights(flights, prefCarriers) {
  const scoredFligts = flights.map(f => {
    f.score = score(f, prefCarriers);
    return f;
  });

  return scoredFligts.sort((f1, f2) => {
    return f1.score - f2.score;
  });
}

function score(flight, prefCarriers) {
  return (flight.arrivalTimestamp - flight.departureTimestamp) / 1000 / 60 / 60 * (prefCarriers.includes(flight.carrier) ? 0.9 : 1);
}


function getSortedFlights({ minTime, maxTime, minDuration = 0,
                            maxDuration = Number.POSITIVE_INFINITY, prefCarriers = []},) {
  const flights = getFlights({ minTime, maxTime, minDuration, maxDuration });
  return sortFlights(flights, prefCarriers);
}

module.exports = {
  getSortedFlights,
}