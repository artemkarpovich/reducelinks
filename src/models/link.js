import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model('Link', new Schema({
  initialLink: { type: String, required: true, ref: 'User' },
  shortLink: { type: String, ref: 'User' },
  date: {type: Date, default: Date.now, ref: 'User' },
  tags: { type: Array },
}));