module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
