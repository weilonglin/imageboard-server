const { Router } = require("express");
const { user } = require("../models");
const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await user.findAll();
  res.send(users);
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await user.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
