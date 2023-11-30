import { getUserById } from '../../services/user/UserService.js';
import response from '../../helpers/response.js';
import ClientError from '../../exceptions/ClientError.js';

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await getUserById(userId);

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

export default getUser;
