const jwt = require('jsonwebtoken');
const SECRET_KEY ="Chandrakant"

function getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
    return null;
  }

const authenticate = (req, res, next) => {
    try {
        let token = getToken(req)
        if (!token) {
            res.status(401).json({ status: false, message: 'Invalid token' });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.message.includes('jwt') || error.message.includes('invalid signature')) {
            res.status(401).json({ status: false, message: 'Invalid token' });
        } else {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};

module.exports = {
    authenticate
};
