module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define(
    "Field",
    {
      fieldName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { notEmpty: true },
      },
      map: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      imageField: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    { underscored: true }
  );

  Field.associate = (db) => {
    Field.hasMany(db.Room, {
      foreignKey: {
        name: "field_id",
        allowNull: true,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Field.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Field;
};
