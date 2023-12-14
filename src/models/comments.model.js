const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Users = require('./users.model');
const Posts = require('./posts.model');

const Comments = db.define(
  "Comments",
  {
    comment_id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      field: "post_id",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      field: "comment",
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    db,
    modelName: "Comments",
    tableName: "Comments",
    timestamps: true,
  }
);

Users.hasMany(Comments, {foreignKey: 'user_id'});
Posts.hasMany(Comments, {foreignKey: 'post_id'});

Comments.sync();

module.exports = Comments;
