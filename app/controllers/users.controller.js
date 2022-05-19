const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  try {
    const { name, email, rol, urlAvatar } = req.body;
    const id = uuidv4();
    const userCreated = await db.users.create({
      id: id,
      name: name,
      email: email,
      photo: urlAvatar,
      rolsId: rol,
    });

    return res.send(userCreated);
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
    console.log("allDevs", "hols");
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
exports.deleteOne = async (req, res) => {
  try {
    await db.users.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({message: "User successfully deleted"});
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
