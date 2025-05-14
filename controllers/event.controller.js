const {
  fetchEvents,
  fetchEventById,
  removeEvent,
  fetchEventByUserId,
  addEvent,
  addUserAttendsEvent,
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

function deleteEventById(request, response, next) {
  const { event_id } = request.params;
  console.log(event_id);
  removeEvent(event_id)
    .then((event) => {
      response.status(204).send({ event });
    })
    .catch((err) => {
      next(err);
    });
}

function getEventByUserId(request, response, next) {
  const { user_id } = request.params;
  console.log(user_id, "<<<<<<<<");
  fetchEventByUserId(user_id)
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
  console.log(request.body);
  addEvent(eventData)
    .then((myEvent) => {
      response.status(201).send({ myEvent });
    })
    .catch((err) => {
      //console.log(err);
      next(err);
    });
}

function postUserAttendsEvent(request, response, next) {
  const eventData = request.body;
  console.log(eventData);
  addUserAttendsEvent(eventData)
    .then((myEvent) => {
      response.status(201).send({ myEvent });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getEvents,
  getEventById,
  deleteEventById,
  postEvent,
  getEventByUserId,
  postUserAttendsEvent,
};
