const jwt = require("jsonwebtoken");
const tokenSecret = process.env.JWT_SECRET || "jwt-secret"; // Ensure this secret is properly set

const authMiddleware = (requiredRole, req, res, next) => {
  return (req, res, next) => {
    // This inner function has access to `requiredRole` and can be used as middleware
    try {
      console.log("inside auth middleware");
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        console.log("token is mission");
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authorization.substring("Bearer ".length);
      const decoded = jwt.verify(token, tokenSecret);
      const { exp, iss, role } = decoded;

      console.log("role", role);

      console.log("date now", Date.now());
      console.log("exp", exp);

      if (
        iss !== "my-api" ||
        exp < Date.now() / 1000 ||
        role !== requiredRole
      ) {
        console.log("forbidden");
        return res.status(403).json({ message: "Forbidden" });
      }

      // Token is valid, proceed to the next middleware

      next();
    } catch (err) {
      console.error("JWT validation error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = {
  authMiddleware,
};
