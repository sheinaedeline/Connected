import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import type { IRating } from '@interfaces/mongoDBInterfaces';
import { Schema, Model} from 'mongoose';
import { ratingObj } from '@mongodb/schemaObject';

const ratingPaginateSchema = new Schema(ratingObj);
ratingPaginateSchema.plugin(paginate);

ratingPaginateSchema.virtual('id').get(function(){
    return this._id.toString();
});

interface ratingPaginationDocument extends mongoose.Document, IRating {}
const ratingPaginateModel = mongoose.model<ratingPaginationDocument, mongoose.PaginateModel<ratingPaginationDocument>>('RatimgPagination', ratingPaginateSchema, 'ratings');
export default ratingPaginateModel;