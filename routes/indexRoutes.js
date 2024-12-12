const express = require("express");
const {
  homePageController,
  registerPageController,
  loginPageController,
  loginController,
  registerController,
} = require("../controllers/indexControllers");

const router = express.Router();

router.get("/", homePageController);

router.get("/register", registerPageController);

router.get("/login", loginPageController);

router.post("/register", registerController);

router.post("/login", loginController);
module.exports = router;
