import express from 'express';
import cors from 'cors';
import V1Routes from './routes';
import { appConfiguration } from './config/app';
import { mongoConnection } from './database/mongo';
const PORT = appConfiguration.port as number;
// console.log(PORT)
const app = express();
app.use(cors());
app.use(express.json());
app.use('/v1', V1Routes);
//BASE URL
app.get('/', (req, res) => {
  return res.json({ message: 'Hello' });
});
//Server is listening on PORT
app.listen(PORT, () => {
  mongoConnection((a) => {
    // console.log(a)
    if (a) process.exit(1);
    else console.log('database connection ok');
  });
  console.log(`server is up at ${PORT}`);
});
