import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import apiError from "../utils/api-error.js";
import apiResponce from "../utils/api-responce.js";
import { sendEmail, createVerificationMailgenContent, createResetPasswordMailgenContent } from "../utils/mail.js";
import { asyncHandler } from "../utils/async-hander.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new apiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new apiError(400, "User already exists with this email");
  }

  const user = new User({
    name,
    email,
    password,
  });

  const { hashedtoken, token, expiryTime } =
    await user.generateTemporaryToken();

  user.token = hashedtoken;
  user.tokenExpiryTime = expiryTime;

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("accessToken", accessToken, cookieOptions);

  res.cookie("refreshToken", refreshToken, cookieOptions);

  const registrationURL = `http://localhost:3000/api/v1/auth/verifyEmail/${token}`;

  const mailgenContent = createVerificationMailgenContent(
    user.name,
    registrationURL,
  );

  await sendEmail({
    email: user.email,
    subject: "Email Verification",
    mailgenContent,
  });

  return res
    .status(201)
    .json(
      new apiResponce(
        201,
        "User registered successfully. Please check your email to verify your account.",
        { user },
      ),
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new apiError(400, "Token is required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    token: hashedToken,
    tokenExpiryTime: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new apiError(400, "Invalid or expired token");
  }

  user.isVerified = true;
  user.token = undefined;
  user.tokenExpiryTime = undefined;

  await user.save();

  return res
    .status(200)
    .json(new apiResponce(200, "Email verified successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "All fields are required");
  }
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new apiError(400, "User not found");
  }
  if (!user.isVerified) {
    throw new apiError(400, "Please verify your email before logging in");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new apiError(400, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
  await user.save();

  return res
    .status(200)
    .json(new apiResponce(200, "User logged in successfully", user));
});

const logoutUser = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  const user = await User.findById(req.userId);
  user.refreshToken = undefined;
  user.refreshTokenExpiry = undefined;
  await user.save();
  return res
    .status(200)
    .json(new apiResponce(200, "User logged out successfully"));
};

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new apiError(400, "Email is required");
  }

  const user = await User.findOne({email});
  if (!user) {
    throw new apiError(400, "User not found");
  }

  const { hashedtoken, token, expiryTime } = await user.generateTemporaryToken();
  user.token = hashedtoken;
  user.tokenExpiryTime = expiryTime;
  await user.save();

  const forgotPasswordURL = `http://localhost:3000/api/v1/auth/reset-password/${token}`;

  const mailgenContent = createResetPasswordMailgenContent(user.name, forgotPasswordURL);

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    mailgenContent,
  });

  return res
    .status(200)
    .json(new apiResponce(200, "Password reset email sent successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new apiError(400, "Token is required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    token: hashedToken,
    tokenExpiryTime: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new apiError(400, "Invalid or expired token");
  }

  const { password } = req.body;

  if (!password) {
    throw new apiError(400, "Password is required");
  }

  user.password = password;
  user.token = undefined;
  user.tokenExpiryTime = undefined;
  user.refreshToken = undefined;
  user.refreshTokenExpiry = undefined;

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  await user.save();

  return res
    .status(200)
    .json(new apiResponce(200, "Password reset successfully"));

}) ;

export {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
