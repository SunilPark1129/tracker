const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "brown";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: "user", // 2 types permission: user, admin => currently using "user" only in this app
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updateAt;
  return obj;
};

//##################### Token ########################//
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
//#####################################################//

const User = mongoose.model("Users", userSchema);

module.exports = User;
