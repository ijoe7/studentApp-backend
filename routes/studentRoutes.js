const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");

router.post("/addStudent", student.addStudent);
router.get("/getAllStudents", student.getAllStudents);
router.get("/getStudent/:id", student.getStudent);
router.put("/updateStudent/:id", student.updateStudent);
router.delete("/deleteStudent/:id", student.deleteStudent);
router.get("/getStudentsInClass/:id", student.getStudentsInClass);
router.put("/removeStudentInClass/:id", student.removeStudentInClass);

module.exports = router;
