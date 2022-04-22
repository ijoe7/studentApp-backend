const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.post("/addUser", user.addUser);
router.get("/getUser/:id", user.getUser);
router.get("/getAllUsers", user.getAllUsers);
router.put("/updateUser/:id", user.updateUser);
router.delete("/deleteUser/:id", user.deleteUser);

module.exports = router;
