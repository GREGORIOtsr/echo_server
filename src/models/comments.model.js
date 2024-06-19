const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Comments = db.define(
  "Comments",
  {
    comment_id: {
      field: "id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      field: "user_id",
      type: DataTypes.UUID,
      allowNull: false
    },
    post_id: {
      field: "post_id",
      type: DataTypes.UUID,
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

Comments.sync();

module.exports = Comments;
