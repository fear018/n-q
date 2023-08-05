const express = require("express");

const userRouter = require("./src/routes/user");

const errorHandler = require("./src/utils/errorHandler");

const app = express();

const PORT = 3000;

app.use(express.json()); // for parsing application/json

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 SERVER listening on PORT: ${PORT}`);
});
