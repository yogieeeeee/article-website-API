import jwt from "jsonwebtoken";
import User from "../models/users.model.js"; // Adjust the path according to your project structure

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is available and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token is unavailable or invalid"
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key from the environment variables
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user in the database based on the ID from the token payload
    const user = await User.findById(decoded.id).select("-password -refreshToken");

    // If the user is not found in the database
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user information to the request object for further use
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.isActive
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(401).json({
      success: false,
      message: "Session expired or token is invalid"
    });
  }
};

export default authMiddleware;