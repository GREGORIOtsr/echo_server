const { db } = require("../config/sql_connection");
const Users = require("../models/users.model");
const Posts = require("../models/posts.model");
const Comments = require("../models/comments.model");
const Likes = require("../models/likes.model");
const Follows = require("../models/follows.model");

const getDummyUsers = async () => {
  const res = await fetch("https://dummyjson.com/users?limit=50");
  const data = await res.json();
  let arr = [];
  data.users.map((u) => {
    obj = {
      email: u.email,
      username: u.username,
      password: u.password,
      profile_name: u.firstName,
      profile_picture: u.image,
    };
    arr = [...arr, obj];
  });
  return arr;
};

const getDummyPosts = async (users) => {
  const res = await fetch("https://dummyjson.com/posts?limit=50");
  const data = await res.json();
  let arr = [];
  for (let i = 0; i < data.posts.length; i++) {
    let num = Math.floor(Math.random() * 50);
    arr = [
      ...arr,
      { user_id: users[num].dataValues.user_id, body: data.posts[i].body },
    ];
  }
  return arr;
};

const getDummyComments = async (users, posts) => {
  const res = await fetch("https://dummyjson.com/comments");
  const data = await res.json();
  let arr = [];
  for (let i = 0; i < data.comments.length; i++) {
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);
    arr = [
      ...arr,
      {
        user_id: users[num1].dataValues.user_id,
        post_id: posts[num2].dataValues.post_id,
        comment: data.comments[i].body,
      },
    ];
  }
  return arr;
};

const createLikes = (users, posts) => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);
    let obj = {
      user_id: users[num1].dataValues.user_id,
      post_id: posts[num2].dataValues.post_id,
    };
    if (arr.indexOf(obj) === -1) {
      arr = [...arr, obj];
    }
  }
  return arr;
};

const createFollows = (users) => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let num1 = Math.floor(Math.random() * 50);
    let num2 = Math.floor(Math.random() * 50);
    if (num1 === num2) {
      num2 === 49 ? (num2 = num2 - 5) : num2++;
    }
    let obj = {
      following_user_id: users[num1].dataValues.user_id,
      followed_user_id: users[num2].dataValues.user_id,
    };
    if (arr.indexOf(obj) === -1) {
      arr = [...arr, obj];
    }
  }
  return arr;
};

const populateDB = async () => {
  try {

    await db.sync({force: true});

    const usersArr = await getDummyUsers();
    const users = await Users.bulkCreate(usersArr, {returning: true});

    const postsArr = await getDummyPosts(users);
    const posts = await Posts.bulkCreate(postsArr, {returning: true});

    const commsArr = await getDummyComments(users, posts);
    await Comments.bulkCreate(commsArr);

    const likesArr = createLikes(users, posts);
    await Likes.bulkCreate(likesArr);

    const follsArr = createFollows(users);
    await Follows.bulkCreate(follsArr);

    console.log("Database populated.");
  } catch (error) {
    console.log(error);
  }
};
populateDB();
