const { fetchEvents } = require("../models/events-model");

function getEvents(request, response) {
  fetchEvents()
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch((err) => {
      response.status(400).send({ msg: "No events found" });
    });
}

module.exports = {
  getEvents,
};
