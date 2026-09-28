import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export default authMiddleware = async (req, resizeBy, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorization or token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).josn({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verification failed", error);
    res.status(400).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};
