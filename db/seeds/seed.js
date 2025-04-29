const format = require("pg-format");
const db = require("../connection");
// const {
//   convertTimestampToDate,
//   createRef,
//   formatComments,
// } = require("./utils");

const seed = ({ usersData, eventsData, user_eventsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS user_events;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL UNIQUE,
        name VARCHAR NOT NULL,
        email VARCHAR,
        password_hash VARCHAR,
        is_staff BOOLEAN DEFAULT FALSE,
        avatar_url VARCHAR
      );`);

      const eventsTablePromise = db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        title VARCHAR,
        description VARCHAR,
        loc_address VARCHAR,
        loc_city VARCHAR,
        loc_postcode VARCHAR,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        created_by INT NOT NULL REFERENCES users(user_id)
      );`);

      return Promise.all([eventsTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE user_events (
        user_id INT REFERENCES users(user_id) NOT NULL,
        event_id INT REFERENCES events(event_id) NOT NULL,
        bookmarked BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (user_id, event_id)
      );`);
    })
    .then(() => {
      return db.query(
        `CREATE INDEX idx_user_events_user_id ON user_events(user_id);`
      );
    })
    .then(() => {
      return db.query(
        `CREATE INDEX idx_user_events_event_id ON user_events(event_id);`
      );
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users ( username, name, email, password_hash, is_staff, avatar_url) VALUES %L;",
        usersData.map(
          ({ username, name, email, password_hash, is_staff, avatar_url }) => [
            username,
            name,
            email,
            password_hash,
            is_staff,
            avatar_url,
          ]
        )
      );
      const usersPromise = db.query(insertUsersQueryStr);

      const insertEventsQueryStr = format(
        "INSERT INTO events (event_id, title, description,loc_address, loc_city, loc_postcode, start_time, end_time, created_by) VALUES %L;",
        eventsData.map(
          ({
            event_id,
            title,
            description,
            loc_address,
            loc_city,
            loc_postcode,
            start_time,
            end_time,
            created_by,
          }) => [
            event_id,
            title,
            description,
            loc_address,
            loc_city,
            loc_postcode,
            start_time,
            end_time,
            created_by,
          ]
        )
      );
      const eventsPromise = db.query(insertEventsQueryStr);

      return Promise.all([eventsPromise, usersPromise]);
    })
    .then(() => {
      const insertUser_EventsQueryStr = format(
        "INSERT INTO user_events (user_id, event_id, bookmarked) VALUES %L RETURNING *;",
        user_eventsData.map(({ user_id, event_id, bookmarked }) => [
          user_id,
          event_id,
          bookmarked,
        ])
      );

      return db.query(insertUser_EventsQueryStr);
    });
};

module.exports = seed;
