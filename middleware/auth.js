const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    //check access token
    const token = req.headers("Authorization");
    if (!token) res.status(500).json({ message: "Authentication failed" });
    // validation access token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET),
      (err, user) => {
        if (err) res.status(400).json({ message: "Authentication failed" });
        // success
        req.user = user;
        next();
      };
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

module.exports = auth;  
