const Users = require("../../models/users.model");

const newUser = {
  email: "test123@test.com",
  username: "testUser123",
  password: "test123",
  profile_name: "test",
  profile_picture: "image.jpg",
};

const getAllUsers = async () => {
    try {
        let users = await Users.findAll({attributes: ['email', 'username', 'profile_name', 'profile_picture', 'role']});
        users = users.map(u => u.dataValues);
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (data) => {
  try {
    const user = await Users.create(data);
    console.log(user);
  } catch (error) {
    // res.status(400).json({message: `ERROR: ${error.stack}`});
    console.log(error);
  }
};

getAllUsers();
// createUser(newUser)
