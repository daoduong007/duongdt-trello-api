import express from 'express';
import cors from 'cors';
import { corsOptions } from '*/config/cors';
import { connectDB } from './config/mongodb';
// import { env } from '*/config/environment';
import { apiV1 } from '*/routers/v1';

connectDB()
  .then(() =>
    console.log('connected successfully to database server'),
  )
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  // Enable req.body data
  app.use(express.json());

  app.use('/v1', apiV1);

  // app.listen(env.APP_PORT, env.APP_HOST, () => {
  //   console.log(`${env.APP_HOST}: ${env.APP_PORT}`);
  // });

  //support herolu deploy
  app.listen(process.env.PORT, () => {
    console.log(`hello , i'm running at port : ${process.env.PORT}`);
  });
};
