import response from '../helpers/response.js';
import { verifyScheduleOwner, findScheduleById } from '../services/schedules/schedules.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import AuthorizationError from '../exceptions/AuthorizationError.js';
import ClientError from '../exceptions/ClientError.js';

const isOwner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id: scheduleId } = req.params;

    const findSchedule = await findScheduleById(scheduleId);

    if (!findSchedule) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    const verify = await verifyScheduleOwner(scheduleId, userId);

    if (!verify) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    next();
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

export default isOwner;
