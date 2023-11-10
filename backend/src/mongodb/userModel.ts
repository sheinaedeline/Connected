import * as bcrypt from 'bcrypt';
import { Schema, Model, model } from 'mongoose';
import type {IUser, IUserMethods} from '@interfaces/mongoDBInterfaces';
import { userObj } from '@mongodb/schemaObject';
type UserModel = Model<IUser, {}, IUserMethods>;
//, timestamps: { createdAt: 'created_at' } (Add/Delete this later depending if you want statistic of new user per year etc)
export const userSchema = new Schema <IUser, UserModel, IUserMethods, {}>(userObj,{ collation: { locale: 'en_US', strength: 1 }, timestamps: { createdAt: 'created_at' } });

userSchema.method('comparePassword', function(password:string) {
    return bcrypt.compareSync(password, this.hash_password);
});


const User = model<IUser, UserModel>('User', userSchema);

export default User;