import jwt from 'jsonwebtoken';
import response from '../helpers/response.js';
import AuthenticationError from '../exceptions/AuthenticationError.js';
import ClientError from '../exceptions/ClientError.js';

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AuthenticationError('Anda belum login. Silahkan login kembali');
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (error, user) => {
      if (error) {
        throw new AuthenticationError(error.message);
      }

      req.user = user;
      next();
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

export default authentication;
