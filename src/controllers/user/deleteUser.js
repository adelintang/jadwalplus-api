import { deleteUserById } from '../../services/user/UserService.js';
import Schedules from '../../models/schedules.js';
import response from '../../helpers/response.js';
import ClientError from '../../exceptions/ClientError.js';

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    await deleteUserById(userId);
    await Schedules.deleteMany({ userId });

    return response({
      statusCode: 200,
      status: 'success',
      message: 'User berhasil dihapus',
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

export default deleteUser;
