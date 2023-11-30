import { getUserById, verifyOldPassword, updatedUserPasswordById } from '../../services/user/UserService.js';
import response from '../../helpers/response.js';
import { changeUserPasswordSchema } from '../../helpers/validator/schema.js';
import InvariantError from '../../exceptions/InvariantError.js';
import ClientError from '../../exceptions/ClientError.js';

const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    const validationResult = changeUserPasswordSchema.validate({ oldPassword, newPassword });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    const foundUser = await getUserById(userId);
    await verifyOldPassword(oldPassword, foundUser.password);
    await updatedUserPasswordById(userId, newPassword);

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Password berhasil di ubah.',
      res,
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return response({
        statusCode: error.statusCode,
        status: 'fail',
        message: error.message,
        res,
      });
    }

    return response({
      statusCode: 500,
      status: 'error',
      message: 'Internal Server Error',
      res,
    });
  }
};

export default changeUserPassword;
