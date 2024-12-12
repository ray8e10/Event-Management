const express = require("express");
const {
  addEventController,
  addEventPageController,
  showEventPageController,
} = require("../controllers/eventControllers");
const upload = require("../configs/multer");

const router = express.Router();

router.get("/", showEventPageController);
router.get("/add/new", addEventPageController);

router.post(
  "/add/new",
  upload.fields([
    { name: "eventImage", maxCount: 1 },
    { name: "eventDocument", maxCount: 1 },
  ]),
  addEventController
);

module.exports = router;
