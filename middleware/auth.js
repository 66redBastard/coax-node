const jwt = require("jsonwebtoken");
const secretToken = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.jwt ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!token) {
    console.log("no token", token);
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secretToken);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token: ", err);
  }
  return next();
};

module.exports = verifyToken;
