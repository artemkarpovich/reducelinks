import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model('Link', new Schema({
  initialLink: String,
  shortLink: String,
  date: {type: Date, default: Date.now }
}));