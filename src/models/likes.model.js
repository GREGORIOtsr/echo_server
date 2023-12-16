const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

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

Likes.sync();

module.exports = Likes;
