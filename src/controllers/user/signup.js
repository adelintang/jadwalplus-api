import { findDuplicateUserByEmail, findDuplicateUserByUsername, addUser } from '../../services/user/UserService.js';
import response from '../../helpers/response.js';
import { signupSchema } from '../../helpers/validator/schema.js';
import ClientError from '../../exceptions/ClientError.js';
import InvariantError from '../../exceptions/InvariantError.js';

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const validationResult = signupSchema.validate({ email, username, password });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    await findDuplicateUserByEmail(email);
    await findDuplicateUserByUsername(username);
    await addUser({ email, username, password });

    return response({
      statusCode: 201,
      status: 'success',
      message: 'Berhasil mendaftar',
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

export default signup;
