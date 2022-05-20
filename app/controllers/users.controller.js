const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const { name, email, rol, urlAvatar } = req.body;
    if (name === "") {
      return res.status(404).send({
        message: "Name can't be empty",
      });
    } else if (email === "") {
      return res.status(404).send({
        message: "Email can't be empty",
      });
    } else if (rol === "") {
      return res.status(404).send({
        message: "You must assign a role to the developer",
      });
    } else {
      const id = uuidv4();
      const userCreated = await db.users.create({
        id: id,
        name: name,
        email: email,
        photo: urlAvatar,
        rolsId: rol,
      });

      return res.send({ message: "User created successfully" });
    }
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.update = async (req, res) => {
  try {
    const { name, email, rol, urlAvatar } = req.body;
    const { id } = req.params;
    if (name === "") {
      return res.status(404).send({
        message: "Name can't be empty",
      });
    } else if (email === "") {
      return res.status(404).send({
        message: "Email can't be empty",
      });
    } else if (rol === "") {
      return res.status(404).send({
        message: "You must assign a role to the developer",
      });
    } else {
      await db.users.update(
        {
          name: name,
          email: email,
          photo: urlAvatar,
          rolsId: rol,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.send({ message: "User updated successfuly" });
    }
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.findAdmin = async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "photo"];
    const userFiltered = await db.users.findOne({
      where: {
        email: "admin@kanbanboard.com",
      },
      include: [{ model: db.rols, as: "rols", attributes: ["name"] }],
      attributes: attributes,
    });
    return res.send(userFiltered);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};

exports.findAll = async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "photo"];
    const allusers = await db.users.findAll({
      include: [{ model: db.rols, as: "rols", attributes: ["name"] }],
      attributes: attributes,
      order: [["name", "ASC"]],
    });
    return res.send(allusers);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.findAllDev = async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "photo"];
    const allDevs = await db.users.findAll({
      where: {
        rolsId: 2,
      },
      include: [{ model: db.rols, as: "rols", attributes: ["name"] }],
      attributes: attributes,
      order: [["name", "ASC"]],
    });
    return res.send(allDevs);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.findOne = async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "photo"];
    const userFiltered = await db.users.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: db.rols, as: "rols", attributes: ["id"] }],
      attributes: attributes,
    });
    return res.send(userFiltered);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.filterOne = async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "photo"];
    const userFiltered = await db.users.findAll({
      where: {
        id: req.params.id,
      },
      include: [{ model: db.rols, as: "rols", attributes: ["id"] }],
      attributes: attributes,
    });
    return res.send(userFiltered);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.deleteOne = async (req, res) => {
  try {
    await db.users.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "User successfully deleted" });
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
