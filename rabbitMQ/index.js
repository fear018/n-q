require("dotenv").config();
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("./swagger.yml");

const userRouter = require("./src/routes/user");
const errorHandler = require("./src/utils/errorHandler");
const getCacheClient = require("./src/services/redis");
const logger = require("./src/utils/logger");
const amqp = require("./src/utils/amqp");

// amqp();

const app = express();

const PORT = parseInt(process.env.PORT) || 3001;
const SWAGGER_PORT = parseInt(process.env.SWAGGER_PORT) || 3002;

app.use(express.json()); // for parsing application/json

// app.use(async (req, res, next) => {
//   req.cacheClient = await getCacheClient();
//   next();
// });

app
  .use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .listen(SWAGGER_PORT, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`🚀 SWAGGER PORT: ${SWAGGER_PORT}`);
    }
    logger.info(`🚀 GATEWAY PORT: ${SWAGGER_PORT}`);
  });

app.get("/", (req, res) => {
  console.log("GATEWAY /");
  res.send("Hello World!");
});

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 GATEWAY PORT: ${PORT}`);
});
