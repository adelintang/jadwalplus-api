import bcrypt from 'bcrypt';
import Users from '../../models/users.js';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';
import DuplicateError from '../../exceptions/DuplicateError.js';

const addUser = async ({ email, username, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new Users({
    email, username, password: hashPassword,
  });

  const newUser = await user.save();

  if (!newUser) {
    throw new InvariantError('Gagal menambahkan user baru');
  }
};

const getUserById = async (id) => {
  const user = await Users.findOne({ _id: id });

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return user;
};

const getUserByEmail = async (email) => {
  const user = await Users.findOne({ email });

  if (!user) {
    throw new InvariantError('Gagal masuk. Email atau Password salah');
  }

  return user;
};

const findDuplicateUserByEmail = async (email) => {
  const user = await Users.findOne({ email });

  if (user) {
    throw new DuplicateError('Gagal mendaftar. Email sudah digunakan');
  }
};

const verifyPassword = async (password, hashedPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordMatch) {
    throw new InvariantError('Gagal masuk. Email atau Password salah');
  }
};

const verifyOldPassword = async (password, hashedPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordMatch) {
    throw new InvariantError('Gagal ubah Password. Password lama tidak cocok');
  }
};

// // belum tentu di pakai
// const getUserByUsername = async (username) => {
//   const user = await Users.findOne({ username });
//   return user;
// };

const findDuplicateUserByUsername = async (username) => {
  const user = await Users.findOne({ username });

  if (user) {
    throw new DuplicateError('Gagal mendaftar. Username sudah digunakan');
  }
};

const deleteUserById = async (id) => {
  const user = await Users.deleteOne({ _id: id });

  if (user.deletedCount === 0) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return user;
};

const updatedUserPasswordById = async (id, newPassword) => {
  const hashNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedPassword = await Users.updateOne({ _id: id }, {
    $set: { password: hashNewPassword },
  });

  if (!updatedPassword.modifiedCount) {
    throw new NotFoundError('User tidak ditemukan');
  }
};

export {
  addUser,
  getUserById,
  getUserByEmail,
  // getUserByUsername,
  updatedUserPasswordById,
  deleteUserById,
  findDuplicateUserByEmail,
  findDuplicateUserByUsername,
  verifyPassword,
  verifyOldPassword,
};
