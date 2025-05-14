const {
  fetchUsers,
  fetchLoginUser,
  fetchCreatedEvents,
  fetchAttendingEvents,
} = require("../models/users-model");

function getUsers(request, response) {
  fetchUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      response.status(400).send({ msg: "No events found" });
    });
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await fetchLoginUser(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (password !== user.password_hash) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const { password_hash, ...safeUser } = user;
    res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

function getCreatedEvents(request, response, next) {
  const { user_id } = request.params;
  fetchCreatedEvents(user_id)
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch((err) => {
      console.log("controller error:" + err.msg);
      next(err);
    });
}

function getAttendingEvents(request, response, next) {
  const { user_id } = request.params;
  fetchAttendingEvents(user_id)
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch((err) => {
      console.log("controller error:" + err.msg);
      next(err);
    });
}

module.exports = {
  getUsers,
  loginUser,
  getCreatedEvents,
  getAttendingEvents,
};
