import Users from '../../models/users.js';
import response from '../../helpers/response.js';

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await Users.deleteOne({ _id: userId });

    if (user.deletedCount === 0) {
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
