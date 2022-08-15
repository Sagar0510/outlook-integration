const express = require("express");
const graph = require("./graph");
const router = express.Router();

router.get("/readMail", (req, res) => {
  console.log(req.session.userId);
  res.render("readMail.hbs", { active: { readMail: true } });
});

router.post("/readMail", async (req, res) => {
  console.log("2", req.body);
  console.log(req.session.userId);
  console.log(req.app.locals.users[req.session.userId]);
  try {
    console.log(req.body["rd-email"]);
    let mailId = req.body["rd-email"] || null;
    let subject = req.body["rd-subject"] || null;

    let val = await graph.getUserMails(
      req.app.locals.msalClient,
      req.session.userId,
      mailId,
      subject
    );
    val = val.value;
    res.json(val);
  } catch (err) {
    console.log(err);
    res.send("69");
  }
});

router.get("/sendMail", (req, res) => {
  res.render("sendMail.hbs", { active: { sendMail: true } });
});

router.post("/sendMail", async (req, res) => {
  console.log("2", req.body);
  console.log(req.session.userId);
  console.log(req.app.locals.users[req.session.userId]);
  try {
    console.log(req.body["rd-email"]);
    let mailId = req.body["rd-email"] || null;
    let subject = req.body["rd-subject"] || null;
    let body = req.body["rd-body"] || null;
    let val = await graph.sendMail(
      req.app.locals.msalClient,
      req.session.userId,
      mailId,
      subject,
      body
    );
    res.json(val);
  } catch (err) {
    console.log(err);
    res.send("69");
  }
});
module.exports = router;
