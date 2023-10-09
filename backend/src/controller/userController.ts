import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import File from '@mongodb/fileModel';
import UserPaginate from '@mongodb/userPaginateModel';
import { AuthorizeTokenResponse } from '@interfaces/authInterface'; 
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime } from '@utils/utils';
import {generateNewToken, getTokenFromHeader,deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
import { Buffer } from 'buffer';
import fileModel from '@mongodb/fileModel';



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
        console.log(req.body);
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
            let tagsArray = tags.split(',')
            if(Array.isArray(tagsArray)){
                for (const item of tagsArray){
                    if(typeof item != "string"){
                        throw new Error('Value inside shift_id array must be a string')
                    }
                }
                lowerCasedTags = tagsArray.map( (items:string) => items.toLowerCase().trim());
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
        const jwtToken = await generateNewToken(email,userType,savedUser._id.toString());

        if(req.file){
            const image = { data: req.file.buffer, contentType: req.file?.mimetype }
            await fileModel.create({userID: savedUser._id,type:"userprofile" ,image});
        }


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


export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const {userType, size, page, tags} = req.body;
        let required_fields = [
            'userType',
			'size',
            'page'
		];

		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){
                throw new Error(`${fields} cannot be empty`)
            }
		}

        if(typeof page != "number" || typeof size != "number"){
            throw new Error("page and size must be a number")
        }

        if(page <=0 || size <= 0){
            throw new Error("page and size number must be greater than 0");
        }

        const myCustomLabels = {
            totalDocs: 'amountOfUser',
            docs: 'userList',
            limit: 'size',
            page: 'currentPage'
        };
        
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

        let query = {
            userType,
            ...(tags && {tags: {$all: [...lowerCasedTags]}})
        }

        const options = {
            page,
            limit: size,
            projection: "-__v -hash_password",
            lean: true,
            leanWithId: true,
            customLabels: myCustomLabels,
            useCustomCountFn: async () => {
                let count = await User.countDocuments(query);
                return count;
            }
        }
        let users = await UserPaginate.paginate(query, options);
        let {userList, ...rest} = users;
        let usersList = Array.isArray(userList)?userList.map((e) => {
            let {_id, ...otherFields} = e;
            return {
                ...otherFields
            }
        }):[]
        return response_success(res,{usersList, ...rest},"Request Success")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}


const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    image: { data: Buffer, contentType: String }
});

const ImageModel = mongoose.model('images', imageSchema);



export async function tokenTest(req: Request, res: Response): Promise<Response|void> {
    try {
        // if(req.file){
        // const image = { data: req.file.buffer, contentType: req.file?.mimetype }
        // console.log(image);
        // const savedImage = await ImageModel.create({image});
        // console.log(savedImage);
        // res.setHeader( "Content-Type", savedImage.image.contentType);
        // res.send(savedImage.image.data);
        console.log(req.body["_id"]);
        return response_success(res,{},"Token is valid");
        
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function imageSendTest(req: Request, res: Response): Promise<Response|void> {
    try {
        const { id: _id } = req.params;
        // If you dont use lean(), you wont decode image as base64
        const image = await fileModel.findOne({ _id }).lean().exec();
        
        // res.type(image.image.contentType);
        // res.header('Content-Disposition', `attachment; filename="test.png"`);
        // res.send(image.image.data.buffer);

        // res.setHeader( "Content-Type", image.image.contentType);
        // res.send(image.image.data.buffer);
        // res.send(image.image.data.buffer.toString('base64'));
        
        res.send(image?.image);
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function viewProfile(req: Request, res: Response): Promise<Response> {
    try {
        // Fetch the user's profile using the extracted _id.
        const user = await User.findById(req.body["_id"]).select("-hash_password -__v"); // Exclude the hash_password field.
        // If the user is not found, return a bad request response.
        if (!user) {
            return response_bad_request(res, "User not found.");
        }
        // If the user is found, return the user's profile.
        return response_success(res, { user }, "User profile retrieved successfully.");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        } 
        return response_internal_server_error(res, error.message);
    }
}