import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import apiRouter from './routes/api';
import redirectRouter from './routes/redirect';
import tagsRouter from './routes/tags';
import infoRouter from './routes/info';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.database);

app.use('/info', infoRouter);
app.use('/redirect', redirectRouter);
app.use('/api', apiRouter);
app.use('/tags', tagsRouter);

app.listen(config.port, function() {
  console.log('server is running on port:' + config.port);
});