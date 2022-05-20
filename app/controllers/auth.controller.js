const config = require("../../config/auth.config");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const id = uuidv4();

    const status = ["To Do", "Done", "Blocked", "Rejected"];
    for (const statu of status) {
      await db.statu.create({
        name: statu,
      });
    }
    const rols = ["Admin", "Dev"];
    for (const rol of rols) {
      await db.rols.create({
        name: rol,
      });
    }
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
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      accessToken: token,
      rolsId: createUser.rolsId,
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
        message: "Email or password wrong",
      });
    }

    const token = jwt.sign({ email: signInUser.email }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      rolsId: signInUser.rolsId,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Email or password wrong" || "Some error occurred.",
    });
  }
};

exports.createPsw = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    const signInUser = await db.users.findOne({
      where: { email: email },
    });
    if (password !== passwordConfirm) {
      return res.status(401).send({
        message: "Passwords do not match",
      });
    } else if (!signInUser) {
      return res.status(404).send({
        message: "The entered email address was not found.",
      });
    } else {
      await db.users.update(
        {
          password: bcrypt.hashSync(password, 8),
        },
        {
          where: {
            id: signInUser.id,
          },
        }
      );
      const token = jwt.sign({ email: signInUser.email }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: signInUser.id,
        name: signInUser.name,
        email: signInUser.email,
        rolsId: signInUser.rolsId,
        accessToken: token,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};
