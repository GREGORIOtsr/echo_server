const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Posts = db.define(
  "Posts",
  {
    post_id: {
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
    body: {
      field: "body",
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    db,
    modelName: "Posts",
    tableName: "Posts",
    timestamps: true,
  }
);

Posts.sync();

module.exports = Posts;
