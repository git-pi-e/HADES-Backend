const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require("../utils/createJWT");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
    let { name, email, password } = req.body;
    let errors = [];
    if (!name) {
        errors.push({ name: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    // if (!password_confirmation) {
    //     errors.push({
    //         password_confirmation: "required",
    //     });
    // }
    // if (password !== password_confirmation) {
    //     errors.push({ password: "mismatch" });
    // }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors, message: 'Multiple errors while signing in, please retry or something' });
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).send(response);
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }],
                                    message: 'Error saving a new user during signup'
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: err }],
                message: 'Something went wrong, error during signup'
            });
        })
}

exports.signin = (req, res) => {
    let { email, password } = req.body; let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            // console.log('Userpass: ', user.password);
            // console.log('Pass: ', password);
            bcrypt.compare(password, user.password).then(isMatch => {
                console.log('isMatch: ', isMatch);
                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{ password: "incorrect" }]
                    });
                }
                console.log(user);
                let access_token = createJWT(
                    user.email,
                    user._id,
                    3000
                );

                console.log('access_token: ', access_token);
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        res.status(500).json({ errors: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            }).catch(err => {
                res.status(500).json({ errors: err, method: req.method, message: 'Error finding the user you requested' });
                console.log(err);
            });
        }
    }).catch(err => {
        res.status(500).json({ errors: err, message: 'User Sign In error' });
    });
}
