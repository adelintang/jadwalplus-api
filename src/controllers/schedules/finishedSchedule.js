import response from '../../helpers/response.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';
import { getUserById } from '../../services/user/UserService.js';
import { setFinishedScheduleById } from '../../services/schedules/schedules.js';

const finishedSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    const schedule = await setFinishedScheduleById(id);

    return response({
      statusCode: 200,
      status: 'success',
      data: {
        id: schedule.id,
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

export default finishedSchedule;
