import express from 'express';
import signup from '../controllers/user/signup.js';
import signin from '../controllers/user/signin.js';
import getUser from '../controllers/user/getUser.js';
import deleteUser from '../controllers/user/deleteUser.js';
import changeUserPassword from '../controllers/user/changeUserPassword.js';
import authentication from '../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/user', authentication, getUser);
userRouter.delete('/user', authentication, deleteUser);
userRouter.patch('/user', authentication, changeUserPassword);

export default userRouter;
