const User = require("../models/User");
const { comparePassword } = require("../util/password");

const authController = {};

authController.login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    let user = await User.findOne({ userId });
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res
          .cookie("token", token, { httpOnly: true })
          .json({ status: "success", user, token });
      }
    }

    throw new Error("The userId or password does not match.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

authController.logout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    })
    .status(200)
    .json({ status: "success" });
};

module.exports = authController;
