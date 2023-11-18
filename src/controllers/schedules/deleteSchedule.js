import Schedules from '../../models/schedules.js';
import Users from '../../models/users.js';
import response from '../../helpers/response.js';

const deleteSchedule = async (req, res) => {
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

    if (!validScheduleUser) {
      throw Error();
    }

    const schedule = await Schedules.findByIdAndDelete(id);

    return response({
      statusCode: 200,
      status: 'success',
      message: 'Schedule berhasil dihapus',
      data: {
        id: schedule.id,
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

export default deleteSchedule;
