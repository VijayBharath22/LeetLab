import jwt from "jsonwebtoken";
import apiResponce from "../utils/api-responce.js";
import apiError from "../utils/api-error.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new apiError(401, "Access token is missing");
  }

  try {
    const verifyAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    req.userId = verifyAccessToken.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await refreshTokenHandler(req, res, next);
    } else {
      throw new apiError(401, "Invalid access token");
    }
  }
};

const refreshTokenHandler = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new apiError(401, "Refresh token is missing");
  }

  try {
    const verifyRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(verifyRefreshToken.id);
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    req.userId = verifyRefreshToken.id;

    next();
    return res.status(200).json(
      new apiResponce(200, "Access token refreshed successfully", {
        accessToken,
      }),
    );
  } catch (error) {
    throw new apiError(401, "login again");
  }
};
export { authMiddleware };
