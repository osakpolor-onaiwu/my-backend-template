const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
//bcrypt helps us hash our password
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

router.post("/", (req, res) => {
    const { name, email, password } = req.body;

    //simple validation
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "please ensure you fill in all field",
        });
    }

    //checks if user already exists
    User.findOne({ email: email }).then((user) => {
        //if user with d email exist do this
        if (user) {
            return res.status(400).json({
                msg: "user with this email already exists",
            });
        }
        //if the user with d email does not exist do this
        const newUser = new User({
            name,
            email,
            password,
        });

        //hashes our password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                newUser.password = hash;

                newUser
                    .save()
                    .then((user) => {
                        //creates token
                        //notice the expiresIn is in seconds. 604800 means
                        //7days. you can choose not to include the expiresIn
                        jwt.sign(
                            {
                                id: user.id,
                            },
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
                    })
                    .catch((err) => res.json(err));
            });
        });
    });
});

module.exports = router;
