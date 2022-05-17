module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
