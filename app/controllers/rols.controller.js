const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

exports.findAll = async (req, res) => {
  try {
    const allRols = await db.rols.findAll();
    return res.send(allRols);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
