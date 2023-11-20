import bcrypt from 'bcrypt';
import Users from '../../models/users.js';
import response from '../../helpers/response.js';
import { changeUserPasswordSchema } from '../../helpers/validator/schema.js';

const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    const validationResult = changeUserPasswordSchema.validate({ oldPassword, newPassword });

    if (validationResult.error) {
      return response({
        statusCode: 400,
        status: 'fail',
        message: validationResult.error.message,
        res,
      });
    }

    const foundUser = await Users.findOne({ _id: userId });

    if (!foundUser) {
      return response({
        statusCode: 404,
        status: 'fail',
        message: 'User tidak ditemukan',
        res,
      });
    }

    const isOldPasswordSame = await bcrypt.compare(oldPassword, foundUser.password);

    if (!isOldPasswordSame) {
      return response({
        statusCode: 400,
        status: 'fail',
        message: 'Gagal ubah Password. Password lama tidak cocok',
        res,
      });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await Users.updateOne({ _id: userId }, {
      $set: { password: hashNewPassword },
    });

    if (!updatedPassword.modifiedCount) {
      return response({
        statusCode: 404,
        status: 'fail',
        message: 'User tidak ditemukan',
        res,
      });
    }

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Password berhasil di ubah.',
      res,
    });
  } catch (error) {
    return response({
      statusCode: 401,
      status: 'fail',
      message: error.message,
      res,
    });
  }
};

export default changeUserPassword;
