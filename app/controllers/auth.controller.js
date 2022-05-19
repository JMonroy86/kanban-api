const config = require("../../config/auth.config");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const id = uuidv4();

    const createUser = await db.users.create({
      id: id,
      name: "Admin",
      email: "admin@kanbanboard.com",
      password: bcrypt.hashSync("adminRoot", 8),
      rolsId: 1,
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
    console.log(error);
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
