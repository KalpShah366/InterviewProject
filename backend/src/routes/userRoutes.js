const express = require("express");
const router = express.Router();
const {
  Signup,
  Login,
  getUser,
  UpdateRole,
} = require("../controllers/userController");

router.post("/Signup", Signup);
router.post("/Login", Login);
router.get("/getUser", getUser);
router.put("/users/:id/roles", UpdateRole);

module.exports = router;
