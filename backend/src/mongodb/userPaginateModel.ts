import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import type {IUser, UserQueryHelpers, IUserMethods} from '@interfaces/mongoDBInterfaces';
import { Schema, Model} from 'mongoose';
import { userObj } from '@mongodb/schemaObject';

const userPaginateSchema = new Schema(userObj);
userPaginateSchema.plugin(paginate);

userPaginateSchema.virtual('id').get(function(){
    return this._id.toString();
});

interface userPaginationDocument extends mongoose.Document, IUser {}
const userPaginateModel = mongoose.model<userPaginationDocument, mongoose.PaginateModel<userPaginationDocument>>('UserPagination', userPaginateSchema, 'users');
export default userPaginateModel;