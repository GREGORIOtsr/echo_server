const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const regex = require("../utils/regex");

const Users = db.define(
  "Users",
  {
    user_id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: regex.email,
      },
    },
    username: {
      field: "username",
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
      validate: {
        is: regex.username,
        max: 24,
        min: 4,
      },
    },
    password: {
      field: "password",
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_name: {
      field: "profile_name",
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "none",
      validate: {
        is: regex.username,
        max: 32,
        min: 4,
      },
    },
    profile_picture: {
      field: "profile_picture",
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "none",
      validate: {
        is: regex.image,
      },
    },
    role: {
      field: "role",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member",
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
       if (user.password) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
       }
      },
      beforeUpdate: (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
         }
      }
     },
     instanceMethods: {
      validPassword: (password) => {
       return bcrypt.compare(password, this.password);
      }
     }
  },
  {
    db,
    modelName: "Users",
    tableName: "Users",
    timestamps: true,
  }
);

Users.sync();

module.exports = Users;
