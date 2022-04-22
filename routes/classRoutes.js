const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.post("/createClass", classController.createClass);
router.get("/getAllClasses", classController.getAllClasses); 
router.get("/getClass/:id", classController.getClass);
router.put("/updateClass/:id", classController.updateClass);
router.delete("/deleteClass/:id", classController.deleteClass);  

module.exports = router;
