/* eslint-disable import/order */
import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import routes from './routes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use('/', routes);

httpServer.listen(process.env.PORT, () => {
  console.log(`🛡️ Server listening on port: 8000🛡️`);
});
