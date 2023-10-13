module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: { type: DataTypes.STRING },
    },
    { underscored: true }
  );

  Post.associate = (db) => {
    Post.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Post.belongsTo(db.UserPost, {
      foreignKey: {
        name: "user_post_id",
        allowNull: false
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Post;
};
