import jwt from 'jsonwebtoken';
import response from '../helpers/response.js';

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw Error('Anda belum login. Silahkan login kembali');
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (error, user) => {
      if (error) {
        throw error;
      }

      req.user = user;
      next();
    });
  } catch (error) {
    response({
      statusCode: 401,
      status: 'fail',
      message: error.message,
      res,
    });
  }
};

export default authentication;
