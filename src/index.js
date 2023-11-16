import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config.js';
import connectMongoDB from './config/config.js';
import userRouter from './routes/user.js';
import scheduleRouter from './routes/schedules.js';

const app = express();
const PORT = 5000;

connectMongoDB();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', userRouter);
app.use('/api/v1/schedules', scheduleRouter);

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
