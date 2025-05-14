const db = require("../db/connection");

function fetchUsers() {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
}

function fetchLoginUser(username) {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then(({ rows }) => {
      return rows[0] || null; // Return user or null
    });
}

function fetchCreatedEvents(user_id) {
  return db
    .query(
      `SELECT event_id, title, description, loc_address, loc_city, loc_postcode, start_time, end_time, user_id, username, name, email,
      event_image, number_of_tickets, tickets_bought,price
           FROM events LEFT JOIN users ON users.user_id = events.created_by where user_id = $1 
           order by start_time ASC;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log("Model with zero rows");
        return Promise.reject({
          status: 404,
          msg: "The user has not created events yet",
        });
      }
      return rows;
    });
}

function fetchAttendingEvents(user_id) {
  return db
    .query(
      `SELECT * from events where event_id in (SELECT event_id from user_events where user_id = $1);`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        console.log("Model with zero rows");
        return Promise.reject({
          status: 404,
          msg: "The user has not registered to any event yet",
        });
      }
      return rows;
    });
}

module.exports = {
  fetchUsers,
  fetchCreatedEvents,
  fetchAttendingEvents,
  fetchLoginUser,
};
