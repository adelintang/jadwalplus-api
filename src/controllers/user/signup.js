import { getUserByEmail, getUserByUsername, addUser } from '../../services/user/UserService.js';
import response from '../../helpers/response.js';
import { signupSchema } from '../../helpers/validator/schema.js';

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const validationResult = signupSchema.validate({ email, username, password });

    if (validationResult.error) {
      return response({
        statusCode: 400,
        status: 'fail',
        message: validationResult.error.message,
        res,
      });
    }

    const foundDuplicatEmail = await getUserByEmail(email);

    if (foundDuplicatEmail) {
      return response({
        statusCode: 409,
        status: 'fail',
        message: 'Gagal mendaftar. Email sudah digunakan',
        res,
      });
    }

    const foundDuplicateUsername = await getUserByUsername(username);

    if (foundDuplicateUsername) {
      return response({
        statusCode: 409,
        status: 'fail',
        message: 'Gagal mendaftar. Username sudah digunakan',
        res,
      });
    }

    await addUser({ email, username, password });

    return response({
      statusCode: 201,
      status: 'success',
      message: 'Berhasil mendaftar',
      res,
    });
  } catch (error) {
    return response({
      statusCode: 400,
      status: 'fail',
      message: error.message,
      res,
    });
  }
};

export default signup;
