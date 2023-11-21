import bcrypt from 'bcrypt';
import Users from '../../models/users.js';

const addUser = async ({ email, username, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new Users({
    email, username, password: hashPassword,
  });

  const newUser = await user.save();

  if (!newUser) {
    throw new Error('Gagal menambahkan user baru');
  }
};

const getUserById = async (id) => {
  const user = await Users.findOne({ _id: id });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await Users.findOne({ email });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await Users.findOne({ username });
  return user;
};

const deleteUserById = async (id) => {
  const user = await Users.deleteOne({ _id: id });
  return user;
};

const updatedUserPasswordById = async (id, newPassword) => {
  const hashNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedPassword = await Users.updateOne({ _id: id }, {
    $set: { password: hashNewPassword },
  });

  return updatedPassword;
};

export {
  addUser,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updatedUserPasswordById,
  deleteUserById,
};
