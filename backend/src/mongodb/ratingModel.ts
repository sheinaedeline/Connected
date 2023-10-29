import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    // required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  ratingType: {
    type: String, // either a rating for professional or a rating for a project
    required: true,
  },
  review: {
    type: String,
  },
});

const Rating = model('Rating', ratingSchema);

export default Rating;
