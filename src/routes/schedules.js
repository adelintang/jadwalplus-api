import express from 'express';
import getAllSchedule from '../controllers/schedules/getAllSchedules.js';
import addSchedule from '../controllers/schedules/addSchedule.js';
import getSchedule from '../controllers/schedules/getSchedule.js';
import deleteSchedule from '../controllers/schedules/deleteSchedule.js';
import finishedSchedule from '../controllers/schedules/finishedSchedule.js';
import updateSchedule from '../controllers/schedules/updateSchedule.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', getAllSchedule);
scheduleRouter.post('/', addSchedule);
scheduleRouter.get('/:id', getSchedule);
scheduleRouter.delete('/:id', deleteSchedule);
scheduleRouter.patch('/:id', finishedSchedule);
scheduleRouter.put('/:id', updateSchedule);

export default scheduleRouter;
