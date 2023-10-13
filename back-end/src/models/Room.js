module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
     
      myTeam:{
        type:DataTypes.INTEGER,
        allowNull:true,
        
      },
      maxPlayer:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
      }
    },
    { underscored: true }
  );

  Room.associate = db => {
    Room.hasMany(db.Join,{
        foreignKey: {
            name: "room_id",
            allowNull: false,
          },
          onDelete: "RESTRICT",
          onUpdate: "RESTRICT",
    })

    Room.belongsTo(db.Field,{
        foreignKey: {
            name: "field_id",
            allowNull: false,
          },
          onDelete: "RESTRICT",
          onUpdate: "RESTRICT",
    })

    
    // Room.belongsTo(db.User,{
    //     foreignKey: {
    //         name: "user_id",
    //         allowNull: true,
    //       },
    //       onDelete: "RESTRICT",
    //       onUpdate: "RESTRICT",
    // })

    Room.belongsTo(db.Create, {
      foreignKey: {
        name: "user_create_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    // Room.hasOne(db.Create, {
    //   foreignKey: {
    //     name: "user_create_id",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });

  }

  return Room;
};
