import * as bcrypt from 'bcrypt';
import { Schema, Model, model, Types} from 'mongoose';


interface IUser {
    userType: string,
    firstName: string,
    lastName?: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    dob: Date,
    abn: string,
    socialURL: string,
    hash_password: string,
    industryType: string,
    tags: Array<string>
}

interface IUserMethods {
    comparePassword(password:string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;


const userSchema = new Schema <IUser, UserModel, IUserMethods>({
    userType: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    abn: {
        type: String,
        trim: true
    },
    socialURL: {
        type: String,
        trim: true
    },
    hash_password: {
        type: String
    },
    industryType: {
        type: String,
        trim: true
    },
    tags: [String]
});

userSchema.method('comparePassword', function(password:string) {
    return bcrypt.compareSync(password, this.hash_password);
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;