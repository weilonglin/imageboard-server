const express = require("express");
const app = express();
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const jsonParser = express.json();
const port = process.env.PORT || 4000;

app.use(jsonParser);

app.use("/users", userRouter);
app.use(imageRouter);
// app.use("/images/:id", imageRouter);

app.listen(port, () => console.log(`Server started in port: ${port}`));
