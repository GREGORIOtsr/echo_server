const Users = require("./users.model");
const Posts = require("./posts.model");
const Comments = require("./comments.model");
const Follows = require("./follows.model");
const Likes = require("./likes.model");

Users.hasMany(Posts, {foreignKey: 'user_id'});
Posts.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(Comments, {foreignKey: 'user_id'});
Comments.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(Follows, {foreignKey: 'following_user_id'});
Follows.belongsTo(Users, {foreignKey: 'following_user_id'});

Users.hasMany(Follows, {foreignKey: 'followed_user_id'});
Follows.belongsTo(Users, {foreignKey: 'followed_user_id'});

Users.hasMany(Likes, {foreignKey: 'user_id'});
Likes.belongsTo(Users, {foreignKey: 'user_id'})

Posts.hasMany(Comments, {foreignKey: 'post_id'});
Comments.belongsTo(Posts, {foreignKey: 'post_id'})

Posts.hasMany(Likes, {foreignKey: 'post_id'});
Likes.belongsTo(Posts, {foreignKey: 'post_id'});
