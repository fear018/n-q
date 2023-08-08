require("dotenv").config();
const express = require("express");

const userRouter = require("./src/routes/user");

const errorHandler = require("./src/utils/errorHandler");

const getCacheClient = require("./src/services/redis");

const app = express();

const PORT = parseInt(process.env.PORT) || 3001;

app.use(express.json()); // for parsing application/json

// app.use(async (req, res, next) => {
//   req.cacheClient = await getCacheClient();
//   next();
// });

app.get("/", (req, res) => {
  console.log("GATEWAY /");
  res.send("Hello World!");
});

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 GATEWAY PORT: ${PORT}`);
});
