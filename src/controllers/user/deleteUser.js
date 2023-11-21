import { deleteUserById } from '../../services/user/UserService.js';
import Schedules from '../../models/schedules.js';
import response from '../../helpers/response.js';

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await deleteUserById(userId);

    if (user.deletedCount === 0) {
      return response({
        statusCode: 404,
        status: 'fail',
        message: 'User tidak ditemukan',
        res,
      });
    }

    await Schedules.deleteMany({ userId });

    return response({
      statusCode: 200,
      status: 'success',
      message: 'User berhasil dihapus',
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

export default deleteUser;
