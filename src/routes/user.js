const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const { checkAuth } = require("../services/auth");

const { createUser, loginUser, getAllUsers } = require("../controllers/user");

router.post("/", asyncErrorHandler(createUser));
router.post("/login", asyncErrorHandler(loginUser));
router.get("/all", checkAuth, asyncErrorHandler(getAllUsers));

module.exports = router;
