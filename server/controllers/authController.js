// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; // adjust path as needed

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = "7d";

// Helper to shape the user object sent back to the frontend
const buildUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  userType: user.userType,
});

/**
 * POST /api/auth/signup
 * Body: { name?, email, password }
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // For now we treat all signups from this page as "admin" users
    // If you later add `name` to the schema, include it here.
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      userType: "",
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      message: "Signup successful",
      user: buildUserResponse(user),
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup." });
  }
};

/**
 * POST /api/auth/signin
 * Body: { email, password }
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      message: "Signin successful",
      user: buildUserResponse(user),
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Server error during signin." });
  }
};
