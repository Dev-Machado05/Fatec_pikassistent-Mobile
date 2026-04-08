const admin = require("../config/firebaseAdmin");

module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ error: "Token missing" });

    const token = header.replace("Bearer ", "");

    const decoded = await admin
      .auth()
      .verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }
};