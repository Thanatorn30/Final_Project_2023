module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define(
        "Vote",
        {
            getjoin:{
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
            },
            sportmanship:{
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
            },
            moody:{
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
            },
            punctual:{
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
            },
            userGetVote:{
                type:DataTypes.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
            }
        },
        { underscored: true }
    );

    Vote.associate = (db) => {
        Vote.belongsTo(db.User,{
            foreignKey: {
                name: "user_id",
                allowNull: false,
              },
              onDelete: "RESTRICT",
              onUpdate: "RESTRICT",
        })
    }
    return Vote;
}