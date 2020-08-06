const express = require("express");
const { Router } = require("express");
const Image = require("../models").image;
const router = new Router();

// router.get("/", async (req, res) => {
//   const images = await image.findAll();
//   res.send(images);
// });
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
