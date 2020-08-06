const { Router } = require("express");
const { user } = require("../models");
const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  try {
    const countUsers = await user
      .findAndCountAll({ limit, offset })
      .then((result) => res.send({ users: result.rows, total: result.count }));
    const users = await user.findAll({
      limit,
      offset,
    });
    res.send(users);
  } catch (e) {
    return e;
  }
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
    return e;
  }
});

module.exports = router;
