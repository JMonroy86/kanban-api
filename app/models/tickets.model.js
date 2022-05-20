module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define(
    "tickets",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      createdDate: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: DataTypes.NOW,
      },
      assignedDate: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      solvedDate: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return Tickets;
};
