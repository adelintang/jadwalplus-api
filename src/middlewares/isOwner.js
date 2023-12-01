import response from '../helpers/response.js';
import { verifyScheduleOwner } from '../services/schedules/schedules.js';

const isOwner = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id: scheduleId } = req.params;

    const verify = await verifyScheduleOwner(scheduleId, userId);

    if (!verify) {
      throw new Error();
    }

    next();
  } catch (error) {
    response({
      statusCode: 403,
      status: 'fail',
      message: 'Akses tidak diperbolehkan',
      res,
    });
  }
};

export default isOwner;
