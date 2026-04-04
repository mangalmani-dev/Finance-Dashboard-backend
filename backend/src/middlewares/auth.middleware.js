import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

// MIDDLEWARE TO AUTHENTICATE USER USING JWT TOKEN FROM HEADER OR COOKIE

const authenticateUser = (req, res, next) => {
  try {
    let token = null;

    // 1) Try Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2) If no header token, try cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3) If still no token
    if (!token) {
      return next(
        new ApiError(401, "No token, authorization denied")
      );
    }

    // 4) Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5) Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    return next(
      new ApiError(401, "Invalid or expired token")
    );
  }
};

export default authenticateUser;