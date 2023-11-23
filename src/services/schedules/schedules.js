import Schedules from '../../models/schedules.js';

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
    throw new Error('Schedule gagal ditambahkan');
  }

  return result;
};

const updatedScheduleById = async ({ id, schedule, dateTime }) => {
  const updatedSchedule = await Schedules.findByIdAndUpdate(id, {
    $set: { schedule, dateTime },
  }, { new: true });

  if (!updatedSchedule) {
    throw new Error();
  }

  return updatedSchedule;
};

export { addSchedule, updatedScheduleById };
