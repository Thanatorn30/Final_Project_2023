module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define("UserPost", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: { notEmpty: true }
    }
  },
  { underscored: true }
  );

  UserPost.associate = (db) => {
    UserPost.belongsTo(db.User, {
        foreignKey: {
          name: "user_id",
          allowNull: false
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });

    UserPost.hasMany(db.Post, {
        foreignKey: {
          name: "user_post_id",
          allowNull: false
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
  }


  return UserPost;
};
