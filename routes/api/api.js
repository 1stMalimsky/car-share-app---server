const express = require("express");
const router = express.Router();

const userRouter = require("../api/user/user");
const carsRouter = require("../api/cars/cars");

router.use("/user", userRouter);

router.use("/cars", carsRouter);


module.exports = router;