const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const { createUserSchema, loginUserSchema } = require("../schemas/user");

const { checkAuth } = require("../helpers/auth");
const validation = require("../helpers/validation");

const { createUser, loginUser, getAllUsers } = require("../controllers/user");

router.post("/", validation(createUserSchema), asyncErrorHandler(createUser));
router.post(
  "/login",
  validation(loginUserSchema),
  asyncErrorHandler(loginUser)
);
// router.get("/all", checkAuth, asyncErrorHandler(getAllUsers));
router.get("/all", asyncErrorHandler(getAllUsers));

module.exports = router;
