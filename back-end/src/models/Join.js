module.exports = (sequelize, DataTypes) => {
  const Join = sequelize.define(
    "Join",
    {
      join_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    { underscored: true }
  );

  Join.associate = (db) => {
    Join.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Join.belongsTo(db.Room,{
      foreignKey: {
          name: "room_id",
          allowNull: true,
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
  })
  };


  return Join;
};
