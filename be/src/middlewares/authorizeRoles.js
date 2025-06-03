// This middleware is not used yet, but it will be useful later when I work on the admin page.
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.level)) {
      return next();
    }

    return res.status(403).json({
      message: "You do not have permission to access this resource",
    });
  };
}

module.exports = authorizeRoles;
