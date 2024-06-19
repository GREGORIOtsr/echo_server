const Users = require("./users.model");
const Posts = require("./posts.model");
const Comments = require("./comments.model");
const Follows = require("./follows.model");
const Likes = require("./likes.model");

Users.hasMany(Posts, {foreignKey: 'user_id'});
Posts.belongsTo(Users, {
  foreignKey: "user_id",
  sourceKey: "user_id",
  as: "user"
});

Users.hasMany(Comments, {foreignKey: 'user_id'});
Comments.belongsTo(Users, {
  foreignKey: "user_id",
  sourceKey: "user_id",
  as: "user"
});

Users.hasMany(Follows, {foreignKey: 'following_user_id'});
Follows.belongsTo(Users, {
  foreignKey: "following_user_id",
  sourceKey: "following_user_id",
  as: "following_user"
});

Users.hasMany(Follows, {foreignKey: 'followed_user_id'});
Follows.belongsTo(Users, {
  foreignKey: "followed_user_id",
  sourceKey: "followed_user_id",
  as: "followed_user"
});

Users.hasMany(Likes, {foreignKey: 'user_id'});
Likes.belongsTo(Users, {
  foreignKey: "user_id",
  sourceKey: "user_id",
  as: "user"
})

Posts.hasMany(Comments, {foreignKey: 'post_id'});
Comments.belongsTo(Posts, {
  foreignKey: "post_id",
  sourceKey: "post_id",
  as: "post"
})

Posts.hasMany(Likes, {foreignKey: 'post_id'});
Likes.belongsTo(Posts, {
  foreignKey: "post_id",
  sourceKey: "post_id",
  as: "post"
});
