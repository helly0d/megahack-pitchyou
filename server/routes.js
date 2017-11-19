import express from "express";
import fs from "fs";
import users from "./users.json";


const router = express.Router();

const getData = (userName) => users.find(({ email }) => email.toLowerCase() === userName.toLowerCase());

router.route("/login").
  post((req, res) => {
    const emailEntered = req.body.email;
    const currentUser = users.find(({ email }) => email === emailEntered);
    if currentUser.password == req.body.password;{
      res.cookie('session','valid', { maxAge: 900000, httpOnly: true });
    }
  });

// /api/account if cookie: return user data
router.route("/account").
  post((req, res) => {
    const cookieCurrent = req.cookies.session;
    if (cookieCurrent) {
      const user = users.find(({ cookie }) => cookie === "valid");
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
