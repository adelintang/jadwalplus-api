import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import connectMongoDB from './config/config.js';
import userRouter from './routes/user.js';
import scheduleRouter from './routes/schedules.js';

const { PORT } = process.env;
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JadwalPlus Api',
      version: '1.0.0',
      description: 'A Documentation for JadwalPlus Api',
    },
    servers: [
      {
        url: 'https://api-jadwalplus-production.up.railway.app/',
      },
    ],
  },
  apis: ['./swagger-docs/*.js'],
};

const specs = swaggerJsDoc(options);

connectMongoDB();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to JadwalPlus Api',
  });
});

app.use('/api/v1', userRouter);
app.use('/api/v1/schedules', scheduleRouter);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
