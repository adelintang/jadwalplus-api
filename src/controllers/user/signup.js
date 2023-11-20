import bcrypt from 'bcrypt';
import Users from '../../models/users.js';
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

    const foundDuplicateEmail = await Users.findOne({ email });

    if (foundDuplicateEmail) {
      return response({
        statusCode: 409,
        status: 'fail',
        message: 'Gagal mendaftar. Email sudah digunakan',
        res,
      });
    }

    const foundDuplicateUsername = await Users.findOne({ username });

    if (foundDuplicateUsername) {
      return response({
        statusCode: 409,
        status: 'fail',
        message: 'Gagal mendaftar. Username sudah digunakan',
        res,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      email,
      username,
      password: hashPassword,
    });

    await user.save();

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
