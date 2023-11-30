import jwt from 'jsonwebtoken';
import response from '../../helpers/response.js';
import { getUserByEmail, verifyPassword } from '../../services/user/UserService.js';
import { signinSchema } from '../../helpers/validator/schema.js';
import InvariantError from '../../exceptions/InvariantError.js';
import ClientError from '../../exceptions/ClientError.js';

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationResult = signinSchema.validate({ email, password });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    const foundUser = await getUserByEmail(email);

    await verifyPassword(password, foundUser.password);

    const user = { userId: foundUser.id };
    const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Berhasil masuk',
      data: {
        accessToken,
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

export default signin;
