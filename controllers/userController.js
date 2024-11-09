const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.registerUser = (req, res) => {
  User.registerUser(req.body, (err, result) => {
    if (err) return res.status(err.status).send(err.message);

    res.status(201).send("Usuário registrado");
  });
};

exports.loginUser = (req, res) => {
  User.loginUser(req.body, (err, result) => {
    if (err) return res.status(err.status).send(err.message);
    return res.status(200).send(result);
  });
};
