import ApiError from "../utils/ApiError.js";

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(
          new ApiError(401, "Unauthorized access")
        );
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return next(
          new ApiError(403, "Access denied")
        );
      }

      next();
    } catch (error) {
      return next(
        new ApiError(
          500,
          error.message || "Internal server error"
        )
      );
    }
  };
};

export default authorizeRoles;