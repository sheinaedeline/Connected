import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import Token from '@mongodb/tokenModel';
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime } from '@utils/utils';
import {generateNewToken, authoriseToken, deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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




export async function tokenTest(req: Request, res: Response): Promise<Response> {
    try {
        // let currentTime = getCurrentTime().toJSDate();
        // let newToken = new Token({
        //     jwtString:"test",
        //     jwtTokenCreationDate:currentTime
        // });
        // await newToken.save();
        const tokenAuthorisedObject = await authoriseToken(req);
        if(tokenAuthorisedObject.status === "invalid"){
            response_not_found(res,"Invalid Token")
        } else{
            await deleteToken(tokenAuthorisedObject.token);
        }
        return response_success(res,{},"Successful Delete Token")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}
