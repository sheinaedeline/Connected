import { Schema, model } from 'mongoose';
import { ratingObj } from './schemaObject';

const ratingSchema = new Schema(ratingObj);

const Rating = model('Rating', ratingSchema);

export default Rating;
