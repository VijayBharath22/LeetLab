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
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION },
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
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
