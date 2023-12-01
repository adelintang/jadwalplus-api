import response from '../../helpers/response.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';
import { getUserById } from '../../services/user/UserService.js';
import { findScheduleById } from '../../services/schedules/schedules.js';

const getSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    const schedule = await findScheduleById(id);

    return response({
      statusCode: 200,
      status: 'success',
      data: {
        schedule: {
          id: schedule.id,
          schedule: schedule.schedule,
          dateTime: schedule.dateTime,
          finished: schedule.finished,
          createdAt: schedule.createdAt,
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

export default getSchedule;
