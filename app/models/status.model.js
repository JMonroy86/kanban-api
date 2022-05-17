module.exports = (sequelize, DataTypes) => {
  const Statu = sequelize.define(
    "statu",
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  return Statu;
};
