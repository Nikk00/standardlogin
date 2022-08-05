import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "The Email is required "],
      unique: true,
      trim: true,
      maxlength: [30, "Email cannot be grater than 30 characters"],
    },
    password: {
      type: String,
      required: [true, "The password is required "],
      unique: true,
      trim: true,
      maxlength: [40, "password cannot be grater than 40 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.statics.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export default models.user || model("user", userSchema);