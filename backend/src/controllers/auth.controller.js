import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import apiError from "../utils/api-error.js";
import apiResponse from "../utils/api-responce.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return new apiResponce(400, "All fields are required");
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new apiResponce(400, "User already exists");
    }
    const { hashedtoken, token, expiryTime } = User.generateTemporaryToken();

    const user = new User({
      name,
      email,
      password,
      token: hashedtoken,
      tokenExpiryTime: expiryTime,
    });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();

    cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    const registrationURL = `http://localhost:3000/verify-email/${token}`;
    const mailgenContent = User.createVerificationMailgenContent(
      user.name,
      registrationURL,
    );
    await sendEmail({
      name: user.name,
      subject: "Email Verification",
      mailgenContent,
    });

    return new apiResponce(201, "User registered successfully", user);
  } catch (error) {
    return new apiError(500, "error in user register", error.message);
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return new apiResponce(400, "Token is required");
  }
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      token: hashedToken,
      tokenExpiryTime: { $gt: Date.now() },
    });
    if (!user) {
      return new apiResponce(400, "Invalid or expired token");
    }
    user.isVerified = true;
    user.token = undefined;
    user.expiryTime = undefined;
    await user.save();
    return new apiResponce(200, "Email verified successfully", user);
  } catch (error) {
    return new apiError(500, "error in email verification", error.message);
  }
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

const refreshToken = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const forgotPasswordToken = async (req, res) => {};

const resetPassword = async (req, res) => {};

export {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  forgotPasswordToken,
  resetPassword,
};
