const jwt = require('jsonwebtoken');

const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');
    try {
      const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = verified;
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).send('Access Forbidden');
      }
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  };
};

module.exports = verifyToken;