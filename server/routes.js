import express from "express";
import users from "./users.json";


const router = express.Router();

router.route("/login").
  post((req, res) => {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    const currentUser = users.profiles.find(({ email }) => email === reqEmail);
    if (currentUser && users.credentials[currentUser.id].password === reqPassword) {
      res.cookie("pitch_SSID", users.credentials[currentUser.id].bearer, { maxAge: 900000, httpOnly: true });
    }

    res.send(JSON.stringify(currentUser));
  });

// /api/account if cookie: return user data
router.route("/account").
  get((req, res) => {
    const cookieCurrent = req.cookies.pitch_SSID;
    const activeUserId = Object.keys(users.credentials).find((id) => users.credentials[id].bearer === cookieCurrent);
    if (activeUserId) {
      const user = users.profiles.find(({ id }) => id === activeUserId);
      res.status(200);
      res.send(JSON.stringify(user));
    } else {
      res.status(403);
      res.send(JSON.stringify({ err: "Forbidden" }));
    }
  });


export default router;
