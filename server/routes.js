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
  post((req, res) => {
    const cookieCurrent = req.cookies.session;
    if (cookieCurrent) {
      const user = users.credentials.find(({ cookie }) => cookie === "valid");
      res.status(200);
      res.send(JSON.stringify(user));
    }
  });


router.route("/getdata").
  post((req, res) => {
    const foundUser = getData(req.body.email);
    res.setHeader("Content-Type", "application/json");
    if (foundUser) {
      res.status(200);
      res.send(JSON.stringify(foundUser));
    } else {
      res.status(404);
      res.send(JSON.stringify({ err: "Not Found" }));
    }
  });

export default router;
