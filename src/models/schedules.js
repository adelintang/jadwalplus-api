import { Schema, model } from 'mongoose';

const schedules = new Schema({
  schedule: {
    type: String,
    required: true,
    index: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Schedules = model('Schedules', schedules);

export default Schedules;
