import Schedules from '../../models/schedules.js';

const addSchedule = async ({ schedule, date, userId }) => {
  const today = new Date().toISOString().split('T')[0];

  const data = new Schedules({
    schedule,
    date,
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

export default addSchedule;
