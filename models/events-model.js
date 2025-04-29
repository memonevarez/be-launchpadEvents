const db = require("../db/connection");

function fetchEvents() {
  //return Promise.resolve({ events: "EventsWow" }); //You need to return a Promise from fetchEvents() to keep the interface consistent with what your real DB call would do.
  return db.query(`SELECT * FROM events;`).then(({ rows }) => {
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

module.exports = {
  fetchEvents,
  fetchEventById,
};
