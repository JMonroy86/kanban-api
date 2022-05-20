const db = require("../models/index");

exports.findAll = async (req, res) => {
  try {
    const allStatus = await db.statu.findAll();
    return res.send(allStatus);
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
