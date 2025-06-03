const User = require("../models/User");
const { encryptPassword } = require("../util/password");
const Todos = require("../models/Todos");

const userController = {};

userController.register = async (req, res) => {
  try {
    let { userId, password } = req.body;
    if (!userId || !password) {
      throw new Error("You did not provide all the required information.");
    }

    const user = await User.findOne({ userId });

    if (user) {
      throw new Error("The userID is already taken.");
    }

    password = await encryptPassword(password);

    const newUser = new User({
      userId,
      password,
    });

    await newUser.save();

    // soon as the user account has created
    // create empty array for data
    await Todos.create({
      userId: newUser._id,
      data: [],
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user info
userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = userController;
