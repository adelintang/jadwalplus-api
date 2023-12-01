import response from '../../helpers/response.js';
import { scheduleSchema } from '../../helpers/validator/schema.js';
import { updatedScheduleById } from '../../services/schedules/schedules.js';
import { getUserById } from '../../services/user/UserService.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';
import InvariantError from '../../exceptions/InvariantError.js';

const updateSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { schedule, dateTime } = req.body;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    const validationResult = scheduleSchema.validate({ schedule, dateTime });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    const updatedSchedule = await updatedScheduleById({ id, schedule, dateTime });

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Schedule berhasil diperbarui',
      data: {
        schedule: {
          id: updatedSchedule.id,
          schedule: updatedSchedule.schedule,
          dateTime: updatedSchedule.dateTime,
          finished: updatedSchedule.finished,
          createdAt: updatedSchedule.createdAt,
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

export default updateSchedule;
