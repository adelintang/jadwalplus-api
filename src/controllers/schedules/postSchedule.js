import response from '../../helpers/response.js';
import { scheduleSchema } from '../../helpers/validator/schema.js';
import { addSchedule } from '../../services/schedules/schedules.js';
import InvariantError from '../../exceptions/InvariantError.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';
import { getUserById } from '../../services/user/UserService.js';

const postSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { schedule, dateTime } = req.body;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    const validationResult = scheduleSchema.validate({ schedule, dateTime });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    const result = await addSchedule({ schedule, dateTime, userId });

    return response({
      statusCode: 201,
      status: 'success',
      message: 'Schedule berhasil ditambahkan',
      data: {
        schedule: {
          id: result.id,
          schedule: result.schedule,
          dateTime: result.dateTime,
          finished: result.finished,
          createdAt: result.createdAt,
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

export default postSchedule;
