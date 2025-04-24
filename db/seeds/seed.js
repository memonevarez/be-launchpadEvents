const format = require("pg-format");
const db = require("../connection");
// const {
//   convertTimestampToDate,
//   createRef,
//   formatComments,
// } = require("./utils");

//{ userData, eventData, UserEventData }
const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS User_Event;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS Users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS Event;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
        CREATE TABLE Users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          email VARCHAR,
          password_hash VARCHAR,
          is_staff BOOLEAN,
          avatar_url VARCHAR
        );`);

      const eventsTablePromise = db.query(`
      CREATE TABLE Event (
        event_id SERIAL PRIMARY KEY,
        title VARCHAR,
        description VARCHAR,
        loc_address VARCHAR,
        loc_city VARCHAR,
        loc_postcode VARCHAR,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        created_by VARCHAR NOT NULL REFERENCES users(username)
      );`);

      return Promise.all([eventsTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE User_Event (
        user_id VARCHAR REFERENCES users(username) NOT NULL,
        event_id INT REFERENCES Event(event_id) NOT NULL,
        bookmarked BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (user_id, event_id)
      );`);
    });
};

module.exports = seed;
