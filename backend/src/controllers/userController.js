const User = require("../model/userModel");
const validator = require("validator");

const Signup = async (req, res) => {
  try {
    const { fullName, email, mobile, gender, education } = req.body;
    if (!fullName || !email || !mobile || !gender || !education) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({
      fullName,
      email,
      mobile,
      gender,
      education,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const Login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please provide email address" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    res.status(200).json({
      message: "Login Successful",
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const UpdateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;
    if (
      !roles ||
      !["user", "admin", "developer", "tester", "manager"].includes(roles)
    ) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { roles },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = { Signup, Login, getUser, UpdateRole };
