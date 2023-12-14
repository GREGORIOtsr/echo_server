const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Users = require('./users.model');

const Follows = db.define(
  "Follows",
  {
    following_user_id: { // User who is following another user
      field: "following_user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followed_user_id: { // User who is being followed
      field: "followed_user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    db,
    modelName: "Follows",
    tableName: "Follows",
    timestamps: true,
  }
);

Users.hasMany(Follows, {foreignKey: 'following_user_id'});
Users.hasMany(Follows, {foreignKey: 'followed_user_id'});

Follows.sync();

module.exports = Follows;
