import Schedules from '../../models/schedules.js';
import response from '../../helpers/response.js';
import Users from '../../models/users.js';

const getSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const user = await Users.findById(userId);

    if (user?.id !== userId) {
      return response({
        statusCode: 403,
        status: 'fail',
        message: 'Akses tidak diperbolehkan',
        res,
      });
    }

    const validScheduleUser = await Schedules.findOne({ _id: id, userId });

    if (validScheduleUser) {
      return response({
        statusCode: 403,
        status: 'fail',
        message: 'Akses tidak diperbolehkan',
        res,
      });
    }

    const schedule = await Schedules.findOne({ _id: id });

    return response({
      statusCode: 200,
      status: 'success',
      data: {
        id: schedule.id,
        dateTime: schedule.dateTime,
        finished: schedule.finished,
        createdAt: schedule.createdAt,
      },
      res,
    });
  } catch (error) {
    return response({
      statusCode: 404,
      status: 'fail',
      message: 'Schedule tidak ditemukan',
      res,
    });
  }
};

export default getSchedule;
