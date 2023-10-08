import { IUser } from "./mongoDBInterfaces";

export interface UserWithID extends IUser{
    _id: string
}
