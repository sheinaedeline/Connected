import * as bcrypt from 'bcrypt';
import { Schema, Model, model, Types, Query, HydratedDocument} from 'mongoose';
import type { QueryWithHelpers} from 'mongoose';
import type {IUser, UserQueryHelpers, IUserMethods} from '@interfaces/mongoDBInterfaces';
import { userObj } from '@mongodb/schemaObject';
type UserModel = Model<IUser, {}, IUserMethods>;
//, timestamps: { createdAt: 'created_at' } (Add/Delete this later depending if you want statistic of new user per year etc)
export const userSchema = new Schema <IUser, UserModel, IUserMethods, {}>(userObj,{ collation: { locale: 'en_US', strength: 1 }, timestamps: { createdAt: 'created_at' } });

userSchema.method('comparePassword', function(password:string) {
    return bcrypt.compareSync(password, this.hash_password);
});

// userSchema.query.byUserType = function byName(
//     this: QueryWithHelpers<any, HydratedDocument<IUser>, UserQueryHelpers>,
//     userType: string
//   ) {
//     return this.find({userType});
// };


const User = model<IUser, UserModel>('User', userSchema);

export default User;