import express from 'express';
import getAllSchedule from '../controllers/schedules/getAllSchedules.js';
import addSchedule from '../controllers/schedules/addSchedule.js';
import getSchedule from '../controllers/schedules/getSchedule.js';
import deleteSchedule from '../controllers/schedules/deleteSchedule.js';
import finishedSchedule from '../controllers/schedules/finishedSchedule.js';
import updateSchedule from '../controllers/schedules/updateSchedule.js';
import authentication from '../middlewares/authentication.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', authentication, getAllSchedule);
scheduleRouter.post('/', authentication, addSchedule);
scheduleRouter.get('/:id', authentication, getSchedule);
scheduleRouter.delete('/:id', authentication, deleteSchedule);
scheduleRouter.patch('/:id', authentication, finishedSchedule);
scheduleRouter.put('/:id', authentication, updateSchedule);

export default scheduleRouter;
