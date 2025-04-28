const devData = require("../data/development-data/index.js");
const seed = require("./seed");
const db = require("../connection");
//const data = require("./db/data/dev-data"); // path to your mock data

seed(devData)
  .then(() => {
    console.log(" Seeding complete!");
    return db.end(); // close the DB connection
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    db.end();
  });
