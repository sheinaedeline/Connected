import {HydratedDocument} from 'mongoose';
import { Schema} from 'mongoose';
import type { QueryWithHelpers, Types} from 'mongoose';
export interface IUser {
    userType: string,
    firstName: string,
    lastName: string,
    userName: string,
    description?:string,
    email: string,
    phoneNumber: string,
    address: string,
    dob: Date,
    abn: string,
    socialURL: string,
    hash_password: string,
    industryType: string,
    averageUserRating?: number,
    tags: Array<string>,
    userImage: string,
    userFile: string
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

export interface IProject {
    owner: Schema.Types.ObjectId; // You can use the user's ObjectId here to reference the owner
    project_title: string;
    tags: Array<string>;
    description: string;
    start_date: Date;
    end_date: Date;
    No_professional: string;        //5 means 5 professionals dont forget to convert to int
    expected_working_hours: string; // 3 means 3 hrs dont forget to convert to int
    skills: string;
    experiences: string;
    online_offline: string;        
    price_budget: string;
    req_prof_criteria: string;      //resume or CV or aything
    status: string;
    potential_applicants: Array<Schema.Types.ObjectId>;
    approved_applicants: Array<Schema.Types.ObjectId>;
    averageProjectRating?: number;
    invited_applicants: Array<Schema.Types.ObjectId>;
}


export interface IRating {
    userId: Schema.Types.ObjectId;
    projectId: Schema.Types.ObjectId;
    ratings: number,
    ratingType: string;
    review: string;
}
