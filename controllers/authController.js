exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    console.log("role check", req.user.role);
    console.log("roles", req.user.role);
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    } else {
      next();
    }
  };
};
