const db = require("../db/connection");

function fetchEvents() {
  //return Promise.resolve({ events: "EventsWow" }); //You need to return a Promise from fetchEvents() to keep the interface consistent with what your real DB call would do.
  return db
    .query(
      `SELECT event_id, title, description, loc_address, loc_city, loc_postcode, start_time, end_time, username,
      event_image,
            number_of_tickets,
            tickets_bought,
            price
                   FROM events LEFT JOIN users ON created_by = user_id
                   ORDER BY start_time asc;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function fetchEventById(event_id) {
  return db
    .query(
      `SELECT title, description, loc_address, loc_city, loc_postcode, start_time, end_time, username, name, email
         FROM events LEFT JOIN users ON users.user_id = events.created_by where event_id = $1`,
      [event_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log("Model with zero rows");
        return Promise.reject({
          status: 404,
          msg: "The event_id provided does not exist",
        });
      }
      return rows[0];
    });
}

function removeEvent(event_id) {
  return db
    .query(`DELETE FROM events WHERE event_id = $1 RETURNING *;`, [event_id])
    .then(({ rows }) => {
      //if no event was deleted returns [], rows[0] would be undefined, so:
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `Event with id ${event_id} does not exist.`,
        });
      }
      return rows[0];
    });
}

function fetchEventByUserId(user_id) {
  return db
    .query(
      `SELECT title, description, loc_address, loc_city, loc_postcode, start_time, end_time, username, name, email
           FROM events LEFT JOIN users ON users.user_id = events.created_by where user_id = $1`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log("Model with zero rows");
        return Promise.reject({
          status: 404,
          msg: "The event_id provided does not exist",
        });
      }
      return rows[0];
    });
}

function addEvent(commentData) {
  const {
    title,
    description,
    loc_address,
    loc_city,
    loc_postcode,
    start_time,
    end_time,
    created_by,
    event_image,
    number_of_tickets,
    tickets_bought,
    price,
  } = commentData;
  return db
    .query(
      `INSERT INTO events (title, description, loc_address, loc_city, loc_postcode, start_time, end_time, created_by,
        event_image, number_of_tickets, tickets_bought, price)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`,
      [
        title,
        description,
        loc_address,
        loc_city,
        loc_postcode,
        start_time,
        end_time,
        created_by,
        event_image,
        number_of_tickets,
        tickets_bought,
        price,
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      /// I had to Rethrow the error to be caught in the calling function
      throw err;
    });
}

function addUserAttendsEvent(eventData) {
  const { event_id, user_id } = eventData;
  return db
    .query(
      `INSERT INTO user_events (user_id, event_id, bookmarked)
        VALUES ($1, $2, false) RETURNING *;`,
      [user_id, event_id]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  fetchEvents,
  fetchEventById,
  removeEvent,
  addEvent,
  fetchEventByUserId,
  addUserAttendsEvent,
};
