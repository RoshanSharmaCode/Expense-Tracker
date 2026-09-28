import express from "express";
import {
  getCurrentUser,
  registerUser,
  updatePassword,
  updateUser,
  userLogin,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);

// Protected routes
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateUser);
userRouter.put("/password", authMiddleware, updatePassword);

export default userRouter;
