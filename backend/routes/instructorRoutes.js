const express = require("express");
const router = express.Router();
const { createClass, getInstructorClasses, getAllInstructors } = require("../controllers/instructorController");

router.post("/", createClass);
router.get("/all", getAllInstructors);
router.get("/:instructorId", getInstructorClasses);

module.exports = router;
