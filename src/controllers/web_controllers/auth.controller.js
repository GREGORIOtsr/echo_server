const jwt = require("jsonwebtoken");
const Users = require("../../models/users.model");
require("dotenv").config();

const signUpUser = async (req, res) => {
  try {
    let user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      user = await Users.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "User created.", user: user });
    } else {
      res
        .status(409)
        .json({ success: false, message: `Email already registered.` });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
    if (email && password) {
      let user = await Users.findOne({
        where: { email: email },
        attributes: {
          exclude: ["user_id"],
        },
      });
      if (!user) {
        res
          .status(400)
          .json({ success: false, message: "Wrong email or password." });
      } else {
        const success = await user.validPassword(password, user.dataValues.password);
        if (!success) {
          res
            .status(400)
            .json({ success: false, message: "Wrong email or password." });
        } else {
          user = user.dataValues;
          delete user.password;
          const data = {
            email: user.email,
            username: user.username,
          };
          const token = jwt.sign(data, `${process.env.JWT_SECRET}`, {
            expiresIn: 3600000,
          });
          res
            .status(200)
            .cookie("access-token", token, {
              httpOnly: true,
              sameSite: "strict",
            })
            .json({ success: true, user: user });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const signOut = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy();
      res.clearCookie("access-token");
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  signUpUser,
  loginUser,
  signOut,
};

module.exports = controllers;
