module.exports = (sequelize, DataTypes) => {
  const Create = sequelize.define(
    "Create",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: { notEmpty: true },
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { notEmpty: true },
      },
      hours: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { notEmpty: true },
      },
    },
    { underscored: true }
  );

  Create.associate = (db) => {
    Create.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Create.hasOne(db.Room, {
      foreignKey: {
        name: "user_create_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Create;
};
