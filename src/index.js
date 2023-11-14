import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = 5000;

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
