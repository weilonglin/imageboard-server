const express = require("express");
const { Router } = require("express");
const Image = require("../models").image;
const router = new Router();

router.get("/images", async (req, res) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  try {
    const countImages = await Image.findAndCountAll({
      limit,
      offset,
    }).then((result) => res.send({ images: result.rows, total: result.count }));

    const images = await Image.findAll({ limit, offset });
    res.send(images);
  } catch (e) {
    return e;
  }
});
router.post("/images", async (req, res) => {
  try {
    const { title, url } = req.body;
    const newImage = await image.create({ title, url });
    res.send(newImage);
  } catch (e) {
    console.log(e);
  }
});

router.get("/images/:id", async (req, res, next) => {
  try {
    const ids = req.params.id;
    console.log("is there an ID", ids);
    const imageUrl = await Image.findByPk(ids);
    console.log("wat is imageUrl", imageUrl);
    if (
      !imageUrl ||
      imageUrl === " " ||
      imageUrl.url === " " ||
      !imageUrl.url
    ) {
      res.status(401).send("No data found");
    } else {
      res.json(imageUrl.url);
    }
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
