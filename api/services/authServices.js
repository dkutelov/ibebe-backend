const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (user) => {
  const SECRET = process.env.SECRET;
  const { username } = user;
  let createdUser;

  let usernameTaken = await User.findOne({ username });

  if (usernameTaken) throw { message: 'User already exisits!' };

  try {
    createdUser = await new User(user).save();
  } catch (error) {
    throw error;
  }

  let token = jwt.sign(
    {
      _id: createdUser._id,
      username: createdUser.username,
    },
    SECRET,
    { expiresIn: '10d' },
  );

  return {
    id: createdUser._id,
    username: createdUser.username,
    token,
    avatar: createdUser.avatar,
  };
};

const authenticateSocialUser = async (userData) => {
  const SECRET = process.env.SECRET;
  const { email } = userData;

  let user = await User.findOne({ email });

  if (!user) {
    user = await new User(userData).save();
  }

  let token = jwt.sign(
    {
      _id: user._id,
      username: user.email,
    },
    SECRET,
    { expiresIn: '10d' },
  );

  return { id: user._id, username: user.email, avatar: user.avatar, token };
};

const login = async (userData) => {
  const SECRET = process.env.SECRET;
  const { username, password } = userData;
  let user = await User.findOne({ username });

  if (!user) throw { message: 'No such user!' };

  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) throw { message: 'Invalid password!' };

  let token = jwt.sign({ _id: user._id, username: user.username }, SECRET, {
    expiresIn: '10d',
  });

  return {
    id: user._id,
    username: user.username,
    token,
    avatar: user.avatar,
  };
};

const getUserByEmail = async (email) => {
  let user = await User.findOne({ email });

  if (!user) return null;

  let token = jwt.sign({ _id: user._id, email: user.email }, SECRET, {
    expiresIn: '10d',
  });

  return {
    id: user._id,
    username: user.email,
    token,
  };
};

const usernameExists = async (username) => {
  const user = await User.findOne({ username });
  return user ? true : false;
};

const getProfileById = (userId) => {
  return User.findOne({ _id: userId }).select('username email avatar');
};

const updateProfile = (profile) => {
  const userId = profile._id;
  const updatedProps = {
    avatar: profile.avatar,
    username: profile.username ? profile.username.toLowerCase() : '',
    email: profile.email,
  };
  return User.findByIdAndUpdate(userId, { $set: updatedProps }, { new: true });
};

module.exports = {
  register,
  login,
  getUserByEmail,
  authenticateSocialUser,
  usernameExists,
  getProfileById,
  updateProfile,
};
