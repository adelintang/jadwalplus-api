import express from 'express';
import getAllSchedule from '../controllers/schedules/getAllSchedules.js';
import postSchedule from '../controllers/schedules/postSchedule.js';
import getSchedule from '../controllers/schedules/getSchedule.js';
import deleteSchedule from '../controllers/schedules/deleteSchedule.js';
import finishedSchedule from '../controllers/schedules/finishedSchedule.js';
import updateSchedule from '../controllers/schedules/updateSchedule.js';
import authentication from '../middlewares/authentication.js';
import isOwner from '../middlewares/isOwner.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', authentication, getAllSchedule);
scheduleRouter.post('/', authentication, postSchedule);
scheduleRouter.get('/:id', authentication, isOwner, getSchedule);
scheduleRouter.delete('/:id', authentication, isOwner, deleteSchedule);
scheduleRouter.patch('/:id', authentication, isOwner, finishedSchedule);
scheduleRouter.put('/:id', authentication, isOwner, updateSchedule);

export default scheduleRouter;
