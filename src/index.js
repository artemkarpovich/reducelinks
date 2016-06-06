import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import router from './routes/api';
import tagsRouter from './routes/tags';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.database);

app.use('/', router);
app.use('/', tagsRouter);

app.listen(config.port, function() {
  console.log('server is running on port:' + config.port);
});