const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Users = require('./users.model');
const Posts = require('./posts.model');

const Likes = db.define(
  "Likes",
  {
    user_id: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      field: "post_id",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    db,
    modelName: "Likes",
    tableName: "Likes",
    timestamps: true,
  }
);

Users.hasMany(Likes, {foreignKey: 'user_id'});
Posts.hasMany(Likes, {foreignKey: 'post_id'});

Likes.sync();

module.exports = Likes;
