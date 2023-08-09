const winston = require("winston");

module.exports = logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  defaultMeta: { service: "gateway" },
  transports: [
    new winston.transports.File({
      filename: "./src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./src/logs/combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
