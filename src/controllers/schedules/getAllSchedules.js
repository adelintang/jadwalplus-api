import response from '../../helpers/response.js';
import filteredSchedules from '../../helpers/filteredShedules.js';
import ClientError from '../../exceptions/ClientError.js';
import AuthorizationError from '../../exceptions/AuthorizationError.js';
import { getUserById } from '../../services/user/UserService.js';
import { findSchedulesByUserId, findSchedulesByUserIdAndSearch } from '../../services/schedules/schedules.js';

const getAllSchedules = async (req, res) => {
  try {
    const { userId } = req.user;
    const { search } = req.query;

    const user = await getUserById(userId);

    if (user?.id !== userId) {
      throw new AuthorizationError('Akses tidak diperbolehkan');
    }

    if (search) {
      const query = new RegExp(search, 'i');
      const searchSchedulesDB = await findSchedulesByUserIdAndSearch(query, userId);
      const searchSchedules = filteredSchedules(searchSchedulesDB);

      return response({
        statusCode: 200,
        status: 'success',
        data: {
          schedules: searchSchedules,
        },
        res,
      });
    }

    const result = await findSchedulesByUserId(userId);
    const schedules = filteredSchedules(result);

    return response({
      statusCode: 200,
      status: 'success',
      data: {
        schedules,
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

export default getAllSchedules;
