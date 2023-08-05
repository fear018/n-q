const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const { createUserSchema, loginUserSchema } = require("../schemas/user");

const { checkAuth } = require("../services/auth");
const validation = require("../services/validation");

const { createUser, loginUser, getAllUsers } = require("../controllers/user");

router.post("/", validation(createUserSchema), asyncErrorHandler(createUser));
router.post(
  "/login",
  validation(loginUserSchema),
  asyncErrorHandler(loginUser)
);
router.get("/all", checkAuth, asyncErrorHandler(getAllUsers));

module.exports = router;
