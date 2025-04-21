const checkRole = allowedRoles => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowedRoles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`
      });
    }
    // If the role is allowed, proceed to the next middleware or route handler
    next();
  };
};

export default checkRole;