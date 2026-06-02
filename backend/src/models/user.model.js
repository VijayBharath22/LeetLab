import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: String,
    tokenExpiryTime: Date,
    refreshToken: String,
    refreshTokenExpiry: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
  this.refreshToken = refreshToken;
  this.refreshTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return refreshToken;
};

userSchema.methods.generateTemporaryToken = async function () {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");
    const expiryTime = Date.now() + 60 * 60 * 1000;
    return { hashedtoken, token, expiryTime };
}  

const userModel = mongoose.model("User", userSchema);

export default userModel;