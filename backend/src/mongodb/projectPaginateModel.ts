import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import type {IProject} from '@interfaces/mongoDBInterfaces';
import { Schema, Model} from 'mongoose';
import { projectObj } from '@mongodb/schemaObject';

const projectPaginateSchema = new Schema(projectObj);
projectPaginateSchema.plugin(paginate);

projectPaginateSchema.virtual('id').get(function(){
    return this._id.toString();
});


interface projectPaginationDocument extends mongoose.Document, IProject {}
const projectPaginateModel = mongoose.model<projectPaginationDocument, mongoose.PaginateModel<projectPaginationDocument>>('ProjectPagination', projectPaginateSchema, 'projects');
export default projectPaginateModel;