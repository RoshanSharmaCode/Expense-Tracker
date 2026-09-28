import User from "../models/userModel.js";
import validator from "validator";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const userToken = (userId) => {
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const registorUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be atleast of 8 characters.",
    });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = createToken(user._id);

    res.status(201).josn({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or passwprd",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: true,
        message: "Invalid email or passwprd",
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user details
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: true,
      message: "Valid name and email are required",
    });
  }

  try {
    const exists = await User.findById({ email, _id: { $ne: req.user.id } });

    if (exists) {
      return req.status(409).json({
        status: false,
        message: "Email already in use",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true, select: "name email" },
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user password
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password invalid",
    });
  }

  try {
    const user = await User.findById(req.user.id).select("password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).josn({
        success: false,
        message: "Password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.save();

    res.status(200).json({
      success: true,
      message: "Password update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
