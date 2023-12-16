const Users = require("./users.model");
const Posts = require("./posts.model");
const Comments = require("./comments.model");
const Follows = require("./follows.model");
const Likes = require("./likes.model");

Users.hasMany(Posts, {foreignKey: 'user_id'});
Users.hasMany(Comments, {foreignKey: 'user_id'});
Users.hasMany(Follows, {foreignKey: 'following_user_id'});
Users.hasMany(Follows, {foreignKey: 'followed_user_id'});
Users.hasMany(Likes, {foreignKey: 'user_id'});

Posts.hasMany(Comments, {foreignKey: 'post_id'});
Posts.hasMany(Likes, {foreignKey: 'post_id'});
