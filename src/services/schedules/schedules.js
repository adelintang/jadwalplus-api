import Schedules from '../../models/schedules.js';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

const addSchedule = async ({ schedule, dateTime, userId }) => {
  const today = new Date().toISOString().split('T')[0];

  const data = new Schedules({
    schedule,
    dateTime,
    finished: false,
    createdAt: today,
    userId,
  });
  const result = await data.save();

  if (!schedule) {
    throw new InvariantError('Schedule gagal ditambahkan');
  }

  return result;
};

const findSchedulesByUserId = (userId) => {
  const schedules = Schedules.find({ userId });
  return schedules;
};

const findSchedulesByUserIdAndSearch = (schedule, userId) => {
  const schedules = Schedules.find({ schedule, userId });
  return schedules;
};

const findScheduleById = async (id) => {
  try {
    const schedule = await Schedules.findOne({ _id: id });

    if (schedule === null) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    return schedule;
  } catch (error) {
    throw new NotFoundError('Schedule tidak ditemukan');
  }
};

const setFinishedScheduleById = async (id) => {
  // const schedule = await Schedules.findByIdAndUpdate(id, {
  //   $set: { finished: true },
  // }, { new: true });

  // if (schedule === null) {
  //   throw new NotFoundError('Schedule tidak ditemukan');
  // }

  // return schedule;
  try {
    const schedule = await Schedules.findByIdAndUpdate(id, {
      $set: { finished: true },
    }, { new: true });

    if (schedule === null) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    return schedule;
  } catch (error) {
    throw new NotFoundError('Schedule tidak ditemukan');
  }
};

// belum kepake
const updatedScheduleById = async ({ id, schedule, dateTime }) => {
  const updatedSchedule = await Schedules.findByIdAndUpdate(id, {
    $set: { schedule, dateTime },
  }, { new: true });

  if (!updatedSchedule) {
    throw new Error();
  }

  return updatedSchedule;
};

export {
  addSchedule,
  updatedScheduleById,
  findSchedulesByUserId,
  findSchedulesByUserIdAndSearch,
  findScheduleById,
  setFinishedScheduleById,
};
