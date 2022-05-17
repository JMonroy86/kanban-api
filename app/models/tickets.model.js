module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define(
    "tickets",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      assignedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      solvedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return Tickets;
};
