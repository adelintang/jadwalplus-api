import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import response from '../../helpers/response.js';
import Users from '../../models/users.js';
import { signinSchema } from '../../helpers/validator/schema.js';

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationResult = signinSchema.validate({ email, password });

    if (validationResult.error) {
      return response({
        statusCode: 400,
        status: 'fail',
        message: validationResult.error.message,
        res,
      });
    }

    const foundUser = await Users.findOne({ email });

    if (!foundUser) {
      return response({
        statusCode: 401,
        status: 'fail',
        message: 'Gagal masuk. Email atau Password salah',
        res,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return response({
        statusCode: 401,
        status: 'fail',
        message: 'Gagal masuk. Email atau Password salah',
        res,
      });
    }

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
    return response({
      statusCode: 400,
      status: 'fail',
      message: error.message,
      res,
    });
  }
};

export default signin;
