const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
//bcrypt helps us hash our password
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

router.post("/", (req, res) => {
    const { email, password } = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({
            msg: "please ensure you fill in all field",
        });
    }

    //checks if user already exists
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(400).json({
                msg: "user does not exists",
            });
        }

        //validate password
        //compares the password supplied with those existing users
        bcrypt.compare(password, user.password).then((isMatch) => {
            //if it does not match any password
            if (!isMatch) {
                return res.status(400).json({ msg: "invalid credential" });
            }

            //if it matches
            jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 604800 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        },
                    });
                }
            );
        });
    });
});

//with the auth middleware included, we can simply send the token
//from the frontend, and get the user with that token
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
});

module.exports = router;
