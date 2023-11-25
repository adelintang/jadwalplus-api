import { getUserById } from '../../services/user/UserService.js';
import response from '../../helpers/response.js';

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await getUserById(userId);

    if (!user) {
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
      data: {
        user: {
          email: user.email,
          username: user.username,
        },
      },
      res,
    });
  } catch (error) {
    return response({
      statusCode: 401,
      status: 'fail',
      message: error.message,
    });
  }
};

export default getUser;
