const res = require("express/lib/response");
const db = require("../models/index");

exports.findAll = async (req, res) => {
  try {
    const data = await db.tickets.findAll({
      include: [
        { model: db.users, as: "creator", attributes: ["name"] },
        { model: db.users, as: "assigned" },
        { model: db.statu, as: "status" },
      ],
      attributes: ["id", "assignedId", "statusId", "creatorId", "title"],
    });

    if (data.length !== 0) {
      const groupOfData = data.reduce((a, b) => {
        let i = a.findIndex((x) => x.dev.id === b.dataValues.assignedId);
        return (
          i === -1
            ? a.push({
                dev: {
                  id: b.dataValues.assigned.id,
                  name: b.dataValues.assigned.name,
                  photo: b.dataValues.assigned.photo,
                },
                tickets: [
                  {
                    id: b.id,
                    creator: b.creator.name,
                    status: { id: b.status.id, name: b.status.name },
                    title: b.title,
                  },
                ],
              })
            : a[i].tickets.push({
                id: b.id,
                creator: b.creator.name,
                status: { id: b.status.id, name: b.status.name },
                title: b.title,
              }),
          a
        );
      }, []);

      res.send(groupOfData);
    } else {
      res.send(null);
    }
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.findOne = async (req, res) => {
  try {
    const data = await db.tickets.findAll({
      where: { assignedId: req.params.id },
      include: [
        { model: db.users, as: "creator", attributes: ["name"] },
        { model: db.users, as: "assigned" },
        { model: db.statu, as: "status" },
      ],
      attributes: ["id", "assignedId", "statusId", "creatorId", "title"],
    });

    if (data.length !== 0) {
      const groupOfData = data.reduce((a, b) => {
        let i = a.findIndex((x) => x.dev.id === b.dataValues.assignedId);
        return (
          i === -1
            ? a.push({
                dev: {
                  id: b.dataValues.assigned.id,
                  name: b.dataValues.assigned.name,
                  photo: b.dataValues.assigned.photo,
                },
                tickets: [
                  {
                    id: b.id,
                    creator: b.creator.name,
                    status: { id: b.status.id, name: b.status.name },
                    title: b.title,
                  },
                ],
              })
            : a[i].tickets.push({
                id: b.id,
                creator: b.creator.name,
                status: { id: b.status.id, name: b.status.name },
                title: b.title,
              }),
          a
        );
      }, []);
      res.send(groupOfData);
    } else {
      res.send(null);
    }
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};

exports.create = async (req, res) => {
  try {
    const {
      title,
      createdDate,
      assignedDate,
      assignedId,
      creatorId,
      statusId,
    } = req.body;
    if (title === "") {
      return res.status(404).send({
        message: "Task description can't be empty",
      });
    } else if (assignedId === "") {
      return res.status(404).send({
        message: "You must assign the task to a developer",
      });
    } else {
      await db.tickets.create({
        title: title,
        createdDate: createdDate,
        assignedDate: assignedDate,
        assignedId: assignedId,
        creatorId: creatorId,
        statusId: statusId,
      });

      res.status(200).send({ message: "Task created successfully" });
    }
  } catch (error) {
    return res.send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await db.tickets.findOne({
      where: { id: id },
      include: [
        { model: db.users, as: "creator", attributes: ["name"] },
        { model: db.users, as: "assigned" },
        { model: db.statu, as: "status" },
      ],
      attributes: [
        "id",
        "assignedId",
        "statusId",
        "creatorId",
        "title",
        "createdDate",
      ],
    });
    res.status(200).send(task);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { assignedDate, assignedId, statusId } = req.body;
    const { id } = req.params;
    console.log(assignedId);
    if (!assignedId) {
      return res.status(404).send({
        message: "You must assign a developer",
      });
    } else {
      await db.tickets.update(
        {
          assignedDate: assignedDate,
          assignedId: assignedId,
          statusId: statusId,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.send({ message: "Task updated successfuly" });
    }
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
exports.deleteOne = async (req, res) => {
  try {
    await db.tickets.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "Task successfully deleted" });
  } catch (error) {
    return {
      message: error.message || "Some error occurred while creating the User.",
    };
  }
};
