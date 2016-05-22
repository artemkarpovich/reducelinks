import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

export default mongoose.model('Link', new Schema({
  initialLink: { type: String, ref: 'User' },
  shortLink: { type: String, ref: 'User' },
  date: {type: Date, default: Date.now, ref: 'User' }
}));