// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export const requireAuth = (req, res, next) => {
  try {
    let token = null;

    // Prefer Authorization: Bearer <token>
    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // Fallback to cookie if you ever decide to set it there
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    const payload = jwt.verify(token, JWT_SECRET); // { userId, email, userType }
    req.user = payload;

    return next();
  } catch (err) {
    console.error("requireAuth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  if (req.user.userType !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
};
