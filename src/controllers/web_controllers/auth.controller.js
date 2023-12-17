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
    res.status(400).json({ message: `ERROR: ${error}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
    if (email && password) {
      let user = await Users.findOne({
        where: { email: email }
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
          const token = jwt.sign({id: user.user_id}, `${process.env.JWT_SECRET}`, {
            expiresIn: 3600000,
          });
          console.log(token);
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

const signOut = (req, res) => {
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

const checkUser = async (req, res) => {
  try {
    if (req.cookies["access-token"]) {
      const token = jwt.decode(req.cookies["access-token"]);
      const user = await Users.findOne({
        where: {user_id: token.id},
        attributes: {
          exclude: ["password", "user_id", "updatedAt"]
        }
      })
      res.status(200).json({success: true, user: user});
    } else {
      res.status(200).json({success: false, message: 'No user logged in.'});
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  signUpUser,
  loginUser,
  signOut,
  checkUser
};

module.exports = controllers;
