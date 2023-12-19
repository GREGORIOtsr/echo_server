const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const Follows = db.define(
  "Follows",
  {
    following_user_id: { // User who is following another user
      field: "following_user_id",
      type: DataTypes.UUID,
      allowNull: false
    },
    followed_user_id: { // User who is being followed
      field: "followed_user_id",
      type: DataTypes.UUID,
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

Follows.schema('public');

Follows.sync();

module.exports = Follows;
