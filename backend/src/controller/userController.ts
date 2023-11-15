import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found, response_forbidden } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import UserPaginate from '@mongodb/userPaginateModel';
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, recalculateProjectRating, recalculateProfessionalRating, recalculateCompanyRating } from '@utils/utils';
import {generateNewToken, getTokenFromHeader,deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { IUser } from './projectController';
import Project from '@mongodb/projectModel';
import Rating from '@mongodb/ratingModel';
import RatingPaginate from '@mongodb/ratingPaginateModel';


export async function register(req: Request, res: Response): Promise<Response> { //API function register a new user
    try {
        const {userType, firstName, lastName, userName, email, description, phoneNumber, address, dob, socialURL, abn, password, tags} = req.body;
        let required_fields = [
			'firstName',
            'userName',
            'email',
			'password'
		];
        const validUserTypes = ['professional', 'company']
        if (validUserTypes.includes(userType) === false){
            throw new Error('user type must either be professional or company')
        }
        
        if (userType === 'professional'){
            required_fields = [...required_fields, 'dob']
        } else{
            required_fields = [...required_fields, 'abn']
        }

		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){ ``
                throw new Error(`${fields} cannot be empty for user type ${userType}`)
            }
		}

        if(!valid_email(email)){
            throw new Error('Email format invalid');
        }

        if(phoneNumber){
            if(!valid_phone_number(phoneNumber)){
                throw new Error('Invalid phone number format');
            }
        }
        
        if (abn && userType=='company'){
            if(!valid_abn(abn)){
                throw new Error('Invalid abn format');
            }
        }

        if (dob && userType=='professional'){
            if(!sql_date_string_checker(dob)){
                throw new Error('Birthdate must be in YYYY-MM-dd string format');
            }
        }
        let lowerCasedTags:string[] = [];
        if (tags){
            let tagsArray = tags.split(',')
            if(Array.isArray(tagsArray)){
                for (const item of tagsArray){
                    if(typeof item != 'string'){
                        throw new Error('Value inside tags array must be a string')
                    }
                }
                lowerCasedTags = tagsArray.map( (items:string) => items.toLowerCase().trim());
            }else{
                throw new Error('tags field must be an array')
            }
        }
        
        let userObject = {
            userType,
            firstName, 
            ...(lastName && {lastName}),
            userName,
            email,
            hash_password : bcrypt.hashSync(password,10),
            ...(phoneNumber && {phoneNumber}),
            ...(description && {description}),
            ...(address && {address}),
            ...((dob && userType === 'professional') && {dob}),
            ...(socialURL && {socialURL}),
            ...((abn && userType === 'company') && {abn}),
            ...(tags && {tags:lowerCasedTags})
        }
        let emailExists = await User.exists({ email });
        if (emailExists != null){
            throw new Error(`The email ${email} is already registered`);
        }
        if(req.file){
            const image = { data: req.file.buffer, contentType: req.file?.mimetype }
            userObject.userImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        let newUser = new User(userObject)
        const savedUser = await newUser.save();
        const jwtToken = await generateNewToken(email,userType,savedUser._id.toString());

        return response_success(res,{userName,email,_id:savedUser._id.toString(),userType: savedUser.userType,jwtToken: `JWT ${jwtToken}`},'Successful Registration')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function login(req: Request, res: Response): Promise<Response> { // Api function to login that will return a JWT token upon a succesfull login
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
            return response_not_found(res,'User not found');
        } else {
            let passwordValid:boolean = existingUser.comparePassword(password);
            if (passwordValid == false){
                return response_unauthorized(res,'Wrong Password');
            } else {
                let jwtToken = await generateNewToken(existingUser.email, existingUser.userType, existingUser._id.toString());
                return response_success(res,{_id:existingUser._id.toString(),userType: existingUser.userType ,jwtToken: `JWT ${jwtToken}`},'Successful Login')
            }
        }
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function editProfile(req: Request, res: Response): Promise<Response> { //Api function that allows a user to edit their  own profile. Additionaly also allow admin to edit other user profile
    try {
        const {userId,firstName, lastName, userName, email, description, phoneNumber, address, dob, socialURL, abn, password, tags} = req.body;
        let userToUpdateId =  userId?userId:req.body['_id'];
        let existingUser: any = await User.findById(userToUpdateId);
        if( existingUser === null || existingUser === undefined){
            return response_not_found(res,'User not found');
        } 
        if(userId){
            if(req.body['role'] !== 'admin'){
                if(userId !== req.body['_id']) {
                    throw new Error('Users can only edit their own profile');
                }
            } 
        }
        let nonEmptyFields = [
            'firstName',
            'lastName',
            'userName',
            'description',
            'address',
            'socialURL',
			'password'
		];
        nonEmptyFields.forEach((fields) => {
            if(req.body[fields]){
                let valid = check_req_field(req.body[fields])
                if(!valid){
                    throw new Error(`${fields} cannot be empty`)
                }
            }
        })
        if(email){  
            if(!valid_email(email)){
                throw new Error('Email format invalid');
            }
            if(email !== existingUser.email){
                let emailExists = await User.exists({ email });
                if (emailExists != null){
                    throw new Error(`The email ${email} is currently being used by another account`);
                }
            }
        }

        if(phoneNumber){
            if(!valid_phone_number(phoneNumber)){
                throw new Error('Invalid phone number format');
            }
        }
        
        if (abn && existingUser.userType ==='company'){
            if(!valid_abn(abn)){
                throw new Error('Invalid abn format');
            }
        }

        if (dob && existingUser.userType ==='professional'){
            if(!sql_date_string_checker(dob)){
                throw new Error('Birthdate must be in YYYY-MM-dd string format');
            }
        }
        let lowerCasedTags:string[] = [];
        if (tags){
            let tagsArray = tags.split(',')
            if(Array.isArray(tagsArray)){
                for (const item of tagsArray){
                    if(typeof item != 'string'){
                        throw new Error('Value inside tags array must be a string')
                    }
                }
                lowerCasedTags = tagsArray.map( (items:string) => items.toLowerCase().trim());
            }else{
                throw new Error('tags field must be an array')
            }
        }
        let updateableFields: (keyof IUser)[] = [
            'firstName',
            'lastName',
            'userName',
            'email',
            'hash_password',
            'phoneNumber',
            'description',
            'address',
            'dob',
            'socialURL',
            'tags',
            'abn',
            'tags',
            'userImage'
        ];

        let updatedUserObject = {
            ...(firstName && {firstName}),
            ...(lastName && {lastName}),
            ...(userName && {userName}),
            ...(email && {email}),
            ...(password && {hash_password:bcrypt.hashSync(password,10)}),
            ...(phoneNumber && {phoneNumber}),
            ...(description && {description}),
            ...(address && {address}),
            ...((dob && existingUser.userType === 'professional') && {dob}),
            ...(socialURL && {socialURL}),
            ...((abn && existingUser.userType === 'company') && {abn}),
            ...(tags && {tags:lowerCasedTags})
        }
        if(req.file){
            const image = { data: req.file.buffer, contentType: req.file?.mimetype }
            updatedUserObject.userImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        updateableFields.forEach((key) => {
            if(updatedUserObject[key]){
                if(existingUser !== null && existingUser !== undefined){
                    existingUser[key] = updatedUserObject[key];    
                }
            }
        })

        await existingUser.save();
        return response_success(res,{},`Succesfully Editted Profile for User ID ${userToUpdateId}`);

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}


export async function uploadCV(req: Request, res: Response): Promise<Response> { //Api that allow user to upload their pdf cv
    try {
        const user = await User.findById(req.body['_id']);
        if(user === null){
            return response_not_found(res,'User not found')
        } else {
            if(req.file) {
                user.userFile = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
                await user.save();
                return response_success(res, {}, 'User CV uploaded successfully.');
            } else {
                return response_bad_request(res,'PDF file not found');
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
        const token_header = req.headers.authorization?.split(' ');
        const token = getTokenFromHeader(token_header?token_header:[]);
        await deleteToken(token);
        return response_success(res,{},'Succesfully Log Out');
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}


export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const {userType, size, page, tags, sortBy} = req.body;
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

        if(typeof page != 'number' || typeof size != 'number'){
            throw new Error('page and size must be a number')
        }

        if(page <=0 || size <= 0){
            throw new Error('page and size number must be greater than 0');
        }

        let splittedSortBy:string[] = sortBy?sortBy.split(' '):[]
        if(sortBy){
            if(splittedSortBy.length !== 2){
                throw new Error('The format of the sortBy field must be: "rating asc|desc"')
            }
            let validSortKey = [
                'rating',
            ]
            if(!validSortKey.includes(splittedSortBy[0])){
                throw new Error('Invalid Sort Key');
            }
            if(splittedSortBy[1] != 'asc' && splittedSortBy[1] != 'desc' ){
                throw new Error('valid sorting value is either asc or desc');
            }
        }

        let sort = {
            ...(splittedSortBy[0] === 'rating' && {averageUserRating:splittedSortBy[1]}),
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
                    if(typeof item != 'string'){
                        throw new Error('Value inside tags array must be a string')
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
            projection: '-__v -hash_password',
            ...(Object.keys(sort).length > 0 && {sort}),
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
        return response_success(res,{usersList, ...rest},'Request Success')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function viewProfile(req: Request, res: Response): Promise<Response> {
    try {
        const {id} = req.params;
        // Fetch the user's profile using the extracted _id.
        const user = await User.findById(id).select('-hash_password -__v').lean(); // Exclude the hash_password field.
        // If the user is not found, return a bad request response.
        if (!user) {
            return response_bad_request(res, 'User not found.');
        }
        // If the user is found, return the user's profile.
        return response_success(res, {user}, 'User profile retrieved successfully.');
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        } 
        return response_internal_server_error(res, error.message);
    }
}

// Forget password
export async function forgetPassword(req: Request, res: Response): Promise<Response> {
    try {
        const {email} = req.params;
        // Fetch the user's profile using email
        const user = await User.findOne({ email });
        // If the user is not found, return a bad request response.
        if (!user) {
            return response_bad_request(res, 'User not found.');
        }
        //generate temporary password (update password in database)
        const temporaryPassword = crypto.randomBytes(10).toString('base64url');
        const hashedPassword = await bcrypt.hashSync(temporaryPassword, 10);
        await User.updateOne({ email: email }, { $set: { hash_password: hashedPassword } });

        //send temp password to user
        //Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'okaybuddy646@gmail.com',
                pass: 'hezg ldar imjg rkkm',
            },
        });
        // Email content
        const mailOptions = {
            from: 'okaybuddy646@gmail.com',
            to: email,
            subject: `Temporary Password`,
            text: 
            `This is your temporary password: '${temporaryPassword}'\n
            You are recommended to create a new password after succesfully logging in.\n`,
        };
    
        // Send the email
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
                return response_internal_server_error(res,'Failed to send forget password email');
            } else {
                console.log('Email sent:', info.response);
                return response_success(res, `${temporaryPassword}`);
            }
        });
        
        return response_success(res, `${temporaryPassword}`);
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        } 
        return response_internal_server_error(res, error.message);
    }
}

export async function rateProfessionalUser(req: Request, res: Response): Promise<Response> {
    try {
        const {projectId, userId, ratings} = req.body;
        const project = await Project.findById(projectId);
        const user = await User.findById(userId);
        const existingRating = await Rating.findOne({ userId, projectId, ratingType: "Professional" });
        // const rateUser = await Rating.find({ userId: userId });
        if (!project) {
            return response_not_found(res, "Project not found");
        } if (project.status != "completed") {
            return response_forbidden(res, "Project not completed, cannot rate the professional user")
        } if (!user) {
            return response_not_found(res, "User not found");
        } // Check if the user has already rated this professional for this project.
        if (existingRating) {
            // If the rating already exists, update it.
            existingRating.ratings = ratings;
            await existingRating.save();
        } else { // user does not have a rating
            let newRating = new Rating({
                userId,
                projectId,
                ratings,
                ratingType: "Professional",
            });
            await newRating.save();
        }
        // Recalculate the average rating of the professional user
        let averageRating = await recalculateProfessionalRating(userId);
        return response_success(res, { averageRating }, "The professional user's average rating has been updated successfully!");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }   
}


export async function rateProject(req: Request, res: Response): Promise<Response> {
    try {
        const { projectId, userId, ratings, review } = req.body;
        const project = await Project.findById(projectId);
        const existingRating = await Rating.findOne({ projectId, userId, ratingType: "Company" });
        if (!project) {
            return response_not_found(res, "Project not found");
        } 
        if (project.status != "completed") {
            return response_forbidden(res, "Project not completed, cannot rate it yet!");
        } 
        // If the rating already exists, update it
        if (existingRating) {
            existingRating.ratings = ratings;
            existingRating.review = review;
            await existingRating.save();
        } else {
            // Create a new rating
            let newRating = new Rating({
                userId,
                projectId,
                ratings,
                review,
                ratingType: "Company",
            });
            await newRating.save();
        }
        // Recalculate the average rating of the project
        let averageRating = await recalculateProjectRating(projectId);
        // Update the owner/company's average rating
        const proj = await Project.findById(projectId);
        if (!proj) {
            return response_not_found(res, 'Project not found');
        }
        const ownerId = proj.owner;
        // Find all projects where the user is the owner
        await recalculateCompanyRating(ownerId.toString());
        // Send success response
        return response_success(res, { averageRating }, "The project's average rating has been updated successfully!");

    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    } 
}


export async function getMultipleUserDetail(req: Request, res: Response): Promise<Response> {
    try {
        const {userIds} = req.body;
        if(Array.isArray(userIds)){
            for (const item of userIds){
                if(typeof item != 'string'){
                    throw new Error('Value inside userIds array must be a string')
                }
            }
        }else{
            throw new Error('userIds field must be an array')
        }

        let userDetailsArr:any[] = [];
        for(let ids of userIds) {
            let userDetail = await User.findById(ids).select('firstName lastName userName').lean();
            let modifiedUserObj = {};
            if(userDetail){
                let {_id, ...rest} = userDetail
                modifiedUserObj = {...rest, id: _id.toString()}
            }
            userDetailsArr.push(modifiedUserObj);
        }
   
        return response_success(res, {userDetailsArr}, "You have successfully rated this professional user!")

    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }   
}

// send email to invite professionals
export async function getReviews(req: Request, res: Response): Promise<Response> {
    try {
        const { size, page } = req.body;
        const userId = req.params.id;
        let required_fields = [
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

        const user = await User.findById(userId);
        if (!user) {
            return response_not_found(res, "User not found");
        }
        let projectIds = []
        if (user.userType === "company") {
            let projects = await Project.find({owner: userId})
            console.log(projects);
            for (let i = 0 ; i < projects.length ; i++ ) {
                projectIds.push(projects[i]._id.toString())
            }
        } 

        const myCustomLabels = {
            totalDocs: 'amountOfReviews',
            docs: 'reviewArray',
            limit: 'size',
            page: 'currentPage'
        };
        
        
        let populate = [
            {
                path: 'userId',
                select: 'firstName userName lastName',
                model:'User',
            },
            {
                path: 'projectId',
                select: 'project_title',
                model:'Project',
            }
        ]

        let query = {
            ...(user.userType === 'professional' && {userId}),
            ratingType: user.userType === 'professional'? 'Professional':'Company',
            ...(user.userType === 'company' && {projectId: {$in: projectIds}})
        }

        console.log(query);
        const options = {
            page,
            sort: { firstName: 'asc', lastName: 'asc' },
            limit: size,
            populate,
            projection: "-__v",
            lean: true,
            leanWithId: true,
            customLabels: myCustomLabels,
            useCustomCountFn: async () => {
                let count = await Rating.countDocuments(query);
                return count;
            }
        }
  
        let ratings = await RatingPaginate.paginate(query, options);
        let {reviewArray, ...rest} = ratings;
        let reviewsList = Array.isArray(reviewArray)?reviewArray.map((e) => {
            let {_id, ...otherFields} = e;
            return {
                ...otherFields
            }
        }):[]
        return response_success(res,{reviewsList, ...rest},"Request Success")
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}