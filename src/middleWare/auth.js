const jwt = require("jsonwebtoken");

function getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
    return null;
  }

const auth = async function (req, res, next) {

    try {
        let token = getToken(req)
        if (!token) {
            res.status(401).json({ status: false, message: 'Invalid token' });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        
        if (!token) {
            return res.status(404).send({ status: false, msg: "token must be present" });
        }
            req.loggedInUser = decoded;
            next()
        }
     catch (err) {
        return res.status(500).send({ msg: "server error", error: err });
    }
};


module.exports = { auth }