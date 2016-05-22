import mongoose from 'mongoose';
import Link from './link';

const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
  name: String,
  password: String,
  links: [{ type: Schema.Types.ObjectId , ref: 'Link' }]
}));