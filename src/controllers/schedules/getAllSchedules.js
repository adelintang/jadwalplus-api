import Schedules from '../../models/schedules.js';
import Users from '../../models/users.js';
import response from '../../helpers/response.js';
import filteredSchedules from '../../helpers/filteredShedules.js';

const getAllSchedules = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await Users.findById(userId);

    if (user.id !== userId) {
      return response({
        statusCode: 403,
        status: 'fail',
        message: 'Akses tidak diperbolehkan',
        res,
      });
    }

    const result = await Schedules.find({ userId });
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
    return response({
      statusCode: 401,
      status: 'fail',
      message: error.message,
      res,
    });
  }
};

export default getAllSchedules;
