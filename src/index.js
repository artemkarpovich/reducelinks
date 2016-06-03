import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import apiRouter from './routes/api';
import redirectRouter from './routes/redirect';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.database);

app.use('/redirect', redirectRouter);
app.use('/api', apiRouter);

app.listen(config.port, function() {
  console.log('server is running on port:' + config.port);
});