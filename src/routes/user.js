import express from 'express';
import signup from '../controllers/user/signup.js';
import signin from '../controllers/user/signin.js';
import getUser from '../controllers/user/getUser.js';
import deleteUser from '../controllers/user/deleteUser.js';
import changeUserPassword from '../controllers/user/changeUserPassword.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/user', getUser);
userRouter.delete('/user', deleteUser);
userRouter.patch('/user', changeUserPassword);

export default userRouter;
