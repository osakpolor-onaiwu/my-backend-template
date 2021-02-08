const config = require("config");
const jwt = require("jsonwebtoken");

// this middle ware is for creating private route
//if you want the user to be authenticated before he can
//send post request of any sort. you can also do it from the front end
const auth = (req, res, next) => {
    //gets token from the reqest header
    const token = req.header("x-auth-token");

    //checks if a token was supplied
    //if no token
    if (!token)
        res.status(401).json({
            msg: "No token provided, authorization denied",
        });

    //if there is a token, verify it
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        //add user from the payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "token is not valid" });
    }
};

module.exports = auth;
