import Schedules from '../../models/schedules.js';
import response from '../../helpers/response.js';
import Users from '../../models/users.js';

const updateSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { schedule, dateTime } = req.body;

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

    if (!schedule || !dateTime) {
      return response({
        statusCode: 400,
        status: 'fail',
        message: 'Gagal Update Schedule. Data yang dimasukkan tidak lengkap',
        res,
      });
    }

    const updatedSchedule = await Schedules.findByIdAndUpdate(id, {
      $set: { schedule, dateTime },
    }, { new: true });

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
    return response({
      statusCode: 404,
      status: 'fail',
      message: 'Schedule tidak ditemukan',
      res,
    });
  }
};

export default updateSchedule;
