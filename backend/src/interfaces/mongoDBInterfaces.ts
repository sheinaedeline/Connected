import {HydratedDocument} from 'mongoose';
import type { QueryWithHelpers, Types} from 'mongoose';
export interface IUser {
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

export interface IUserMethods {
    comparePassword(password:string): boolean;
}

export interface UserQueryHelpers {
    byUserType(name: string): QueryWithHelpers<
      HydratedDocument<IUser>[],
      HydratedDocument<IUser>,
      UserQueryHelpers
    >
}