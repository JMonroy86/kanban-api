module.exports = (sequelize, DataTypes) => {
  const Rols = sequelize.define(
    "rols",
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  return Rols;
};
