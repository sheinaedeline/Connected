import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User, { IUser } from '@mongodb/userModel';
import { AuthorizeTokenResponse } from '@interfaces/authInterface'; 
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime } from '@utils/utils';
import {generateNewToken, getTokenFromHeader,deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
export type {IUser} from '@mongodb/userModel'

export async function register(req: Request, res: Response): Promise<Response> {
    try {
        const {userType, firstName, lastName, name, email, phoneNumber, address, dob, socialURL, abn, password, tags} = req.body;
        let required_fields = [
			'firstName',
            'lastName',
            'name',
            'email',
			'password'
		];
        const validUserTypes = ["professional", "company"]
        if (validUserTypes.includes(userType) === false){
            throw new Error("user type must either be professional or company")
        }
        
        if (userType === "professional"){
            required_fields = [...required_fields, "dob"]
        } else{
            required_fields = [...required_fields, "abn"]
        }

		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){
                throw new Error(`${fields} cannot be empty for user type ${userType}`)
            }
		}

        if(!valid_email(email)){
            throw new Error("Email format invalid");
        }

        if(phoneNumber){
            if(!valid_phone_number(phoneNumber)){
                throw new Error("Invalid phone number format");
            }
        }
        
        if (abn && userType=="company"){
            if(!valid_abn(abn)){
                throw new Error("Invalid abn format");
            }
        }

        if (dob && userType=="professional"){
            if(!sql_date_string_checker(dob)){
                throw new Error("Birthdate must be in YYYY-MM-dd string format");
            }
        }
        let lowerCasedTags:string[] = [];
        if (tags){
            if(Array.isArray(tags)){
                for (const item of tags){
                    if(typeof item != "string"){
                        throw new Error('Value inside shift_id array must be a string')
                    }
                }
                lowerCasedTags = tags.map( (items:string) => items.toLowerCase());
            }else{
                throw new Error('tags field must be an array')
            }
        }
        
        let newUser = new User({
            userType,
            firstName, 
            lastName,
            name,
            email,
            hash_password : bcrypt.hashSync(password,10),
            ...(phoneNumber && {phoneNumber}),
            ...(address && {address}),
            ...((dob && userType === "professional") && {dob}),
            ...(socialURL && {socialURL}),
            ...((abn && userType === "company") && {abn}),
            ...(tags && {tags:lowerCasedTags})
        })
        let emailExists = await User.exists({ email });
        if (emailExists != null){
            throw new Error(`The email ${email} is already registered`);
        }
        const savedUser = await newUser.save();
        console.log(savedUser._id.toString());
        const jwtToken = await generateNewToken(email,userType,savedUser._id.toString());
        return response_success(res,{name,email, jwtToken: `JWT ${jwtToken}`},"Successful Registration")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    try {
        const {email, password} = req.body;
        let required_fields = [
            'email',
			'password'
		];

		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){
                throw new Error(`${fields} cannot be empty`)
            }
		}

        let existingUser = await User.findOne({email});

        if( existingUser == null){
            return response_not_found(res,"User not found");
        } else {
            let passwordValid:boolean = existingUser.comparePassword(password);
            if (passwordValid == false){
                return response_unauthorized(res,"Wrong Password");
            } else {
                let jwtToken = await generateNewToken(existingUser.email, existingUser.userType, existingUser._id.toString());
                return response_success(res,{jwtToken: `JWT ${jwtToken}`},"Successful Login")
            }
        }
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}


export async function logout(req: Request, res: Response): Promise<Response> {
    try {
        const token_header = req.headers.authorization?.split(" ");
        const token = getTokenFromHeader(token_header?token_header:[]);
        await deleteToken(token);
        return response_success(res,{},"Succesfully Log Out");
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}


export async function getProfessionalUsers(req: Request, res: Response): Promise<Response> {
    try {
        let users = await User.find().byUserType("professional").lean();
        let professionalUsers = users.map((document) => 
        {
            let documentObj = document;
            let {_id,__v, hash_password, ...rest} = documentObj
            return {
                id:_id.toString(),
                ...rest
            }
        })
        return response_success(res,{professionalUsers},"Request Success")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}






export async function tokenTest(req: Request, res: Response): Promise<Response> {
    try {
        let users = await User.find().byUserType("professional").lean();
        let professionalUsers = users.map((document) => 
        {
            let documentObj = document;
            let {_id,__v, hash_password, ...rest} = documentObj
            return {
                id:_id.toString(),
                ...rest
            }
        })
        return response_success(res,{professionalUsers},"Request Success")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}
