# Events Platform Backend

This is the backend for the **Events Platform** — a mobile-first app where users can create, discover, and join community events. Staff users can manage and oversee all events, while regular users can browse, bookmark, and sign up for events of interest.

The backend is built with **Node.js**, **Express**, and **PostgreSQL**, following RESTful API principles.

---

## 📂 Project Structure

```
.
├── db/
│   ├── data/              # test data for database seeding, sample usernames and passwords are here
│   ├── seeds/             # Seed and run-seed
│   └── index.js           # DB connection
├── controllers/           # Route logic
├── models/                # Database queries
├── routes/                # Express routes
├── app.js                 # Express app
├── server.js              # Entry point
├── endpoints.json         # API documentation
└── README.md
```

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/memonevarez/be-launchpadEvents.git
cd be-launchpadEvents
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following (adjust as needed):

```
PGDATABASE=nc_launchpad

```

---

### 4. Set Up PostgreSQL

Ensure PostgreSQL is running and you have a user and database created. Then:

```bash
psql -f setup.sql
```

---

### 5. Run Migrations and Seed Data

To set up your schema and populate the database with seed data:

```bash
npm run setup-dbs
node run-seed.js
```

---

### 6. Start the Server

```bash
npm start
```

The server will run on `http://localhost:9090`.

---

## 📡 Available Endpoints

All available endpoints and example responses are documented in `endpoints.json`. You can access them via:

```
GET /api
```

---

## 🧪 Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm start`         | Starts the server                     |
| `npm run dev`       | Starts server with nodemon (dev mode) |
| `npm run setup-dbs` | Creates the development database      |
| `npm run seed`      | Seeds the database with sample data   |
| `npm test`          | Runs tests (if available)             |

---

## ✅ Coming Soon

- Authentication & authorization
- Admin dashboard controls
- Full test coverage with Jest & Supertest

---

## 📬 Contact

Created by Guillermo Nevarez  
Questions or suggestions? Email us at memonevarez@hotmail.com
