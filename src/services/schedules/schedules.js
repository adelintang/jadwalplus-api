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

const verifyScheduleOwner = async (scheduleId, userId) => {
  const result = await Schedules.findOne({ _id: scheduleId, userId });
  return result;
};

const updatedScheduleById = async ({ id, schedule, dateTime }) => {
  try {
    const updatedSchedule = await Schedules.findByIdAndUpdate(id, {
      $set: { schedule, dateTime },
    }, { new: true });

    if (updatedSchedule === null) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    return updatedSchedule;
  } catch (error) {
    throw new NotFoundError('Schedule tidak ditemukan');
  }
};

const deleteScheduleById = async (id) => {
  try {
    const schedule = await Schedules.findByIdAndDelete(id);

    if (schedule === null) {
      throw new NotFoundError('Schedule tidak ditemukan');
    }

    return schedule.id;
  } catch (error) {
    throw new NotFoundError('Schedule tidak ditemukan');
  }
};

export {
  addSchedule,
  updatedScheduleById,
  findSchedulesByUserId,
  findSchedulesByUserIdAndSearch,
  findScheduleById,
  setFinishedScheduleById,
  verifyScheduleOwner,
  deleteScheduleById,
};
