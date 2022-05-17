const config = require("../../config/auth.config");
const db = require("../models/index");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = await db.users.create({
      name: "name",
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    const token = jwt.sign({ email: createUser.email }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      name: createUser.name,
      email: createUser.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred.",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const signInUser = await db.users.findOne({
      where: { email: req.body.email },
    });
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      signInUser.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ email: signInUser.email }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      name: signInUser.name,
      email: signInUser.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred.",
    });
  }
};
