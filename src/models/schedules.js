import { Schema, model } from 'mongoose';

const schedules = new Schema({
  schedule: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    required: true,
  },
  rightToday: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  userId: {
    type: Boolean,
    required: true,
  },
});

const Schedules = model('Schedules', schedules);

export default Schedules;
