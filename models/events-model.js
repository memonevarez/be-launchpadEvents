//const db = require("../db/connection");

function fetchEvents() {
  return Promise.resolve({ events: "EventsWow" });
  //   return db.query(`SELECT * FROM topics;`).then(({ rows }) => {
  //     return rows;
  //   });
}

module.exports = {
  fetchEvents,
};
