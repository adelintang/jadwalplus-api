import response from '../../helpers/response.js';
import { getUserById } from '../../services/user/UserService.js';
import { deleteScheduleById } from '../../services/schedules/schedules.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';

const deleteSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    const scheduleId = await deleteScheduleById(id);

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Schedule berhasil dihapus',
      data: {
        id: scheduleId,
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

export default deleteSchedule;
