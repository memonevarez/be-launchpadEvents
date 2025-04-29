const {
  fetchEvents,
  fetchEventById,
  addEvent,
} = require("../models/events-model");

function getEvents(request, response) {
  fetchEvents()
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch((err) => {
      response.status(400).send({ msg: "No events found" });
    });
}

function getEventById(request, response, next) {
  const { event_id } = request.params;
  fetchEventById(event_id)
    .then((event) => {
      response.status(200).send({ event });
    })
    .catch((err) => {
      console.log("controller error:" + err.msg);
      next(err);
    });
}

function postEvent(request, response, next) {
  const eventData = request.body;
  addEvent(eventData)
    .then((myEvent) => {
      response.status(201).send({ myEvent });
    })
    .catch((err) => {
      //console.log(err);
      next(err);
    });
}

module.exports = {
  getEvents,
  getEventById,
  postEvent,
};
