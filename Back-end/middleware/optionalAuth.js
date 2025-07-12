import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const optionalAuth = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      // No token provided, continue without authentication
      req.user = null;
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    // Check if user still exists in database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // User not found, continue without authentication
      req.user = null;
      return next();
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Any error in token verification, continue without authentication
    console.log("Optional auth middleware error:", error.message);
    req.user = null;
    next();
  }
};
