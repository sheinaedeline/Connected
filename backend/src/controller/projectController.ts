//Bootstrap Code
import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found, response_forbidden } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import { check_req_field, sql_date_string_checker, recalculateProfessionalRating, recalculateCompanyRating } from '@utils/utils';
export type {IUser} from '@interfaces/mongoDBInterfaces'
import ProjectPaginate from '@mongodb/projectPaginateModel';
import Project from '@mongodb/projectModel';
import Rating from '@mongodb/ratingModel';
import { IProject } from '@interfaces/mongoDBInterfaces';
import { DateTime } from "luxon";
import RatingPaginate from '@mongodb/ratingPaginateModel';
import { Schema, Types } from 'mongoose';
import nodemailer from 'nodemailer';

//Project status
enum ProjectStatus {
    New = "new",
    Ongoing = "ongoing",
    Completed = "completed",
}
const mongoose = require('mongoose');

//Create project
export async function createProject(req: Request, res: Response): Promise<Response> {
    try {
        const {project_title,tags, description, start_date,end_date,No_professional,expected_working_hours,skills,experiences,online_offline,price_budget,req_prof_criteria,} = req.body;
        let required_fields = [
            'project_title',
            'start_date',
            'end_date',
			'No_professional',
            'expected_working_hours',
            'online_offline'
		];
		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){
                throw new Error(`${fields} cannot be empty.`)
            }
		}

        let lowerCasedTags:string[] = [];
        if (tags){
            if(Array.isArray(tags)){
                for (const item of tags){
                    if(typeof item != "string"){
                        throw new Error('Value inside array must be a string')
                    }
                }
                lowerCasedTags = tags.map( (items:string) => items.toLowerCase());
            }else{
                throw new Error('tags field must be an array')
            }
        }
        
        let newProject = new Project({
            owner: req.body["_id"],// From the function
            project_title,
            tags: lowerCasedTags,
            description,
            start_date,
            end_date,
            No_professional: parseInt(No_professional), // Convert to integer
            expected_working_hours: parseInt(expected_working_hours), // Convert to integer
            skills,
            experiences,
            online_offline,
            price_budget,
            req_prof_criteria,
            status: ProjectStatus.New,
            potential_applicants: [],
            approved_applicants: [],
        });
        
        const savedProject = await newProject.save();

        return response_success(res,savedProject,"Succesfully Created Project");

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_bad_request(error);
    }
}



export async function getProjects(req: Request, res: Response): Promise<Response> { //Api function that allows the user to paginate the projects in the platform
    try {
        const {tags, size, page, companyId, projectName, startsAt, endsAt, userStatus ,userId, status, sortBy} = req.body;
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

        if(userStatus){
            if(!check_req_field(userId)) {
                throw new Error('userId cant be empty if user status is enabled')
            }
        }

        if(typeof page != "number" || typeof size != "number"){
            throw new Error("page and size must be a number")
        }

        if(page <=0 || size <= 0){
            throw new Error("page and size number must be greater than 0");
        }
        if(startsAt){
            if(!sql_date_string_checker(startsAt)){
                throw new Error("Starts at must be in YYYY-MM-dd string format");
            }
        }
        if(endsAt){
            if(!sql_date_string_checker(endsAt)){
                throw new Error("Starts at must be in YYYY-MM-dd string format");
            }
        }

        let splittedSortBy:string[] = sortBy?sortBy.split(' '):[]
        if(sortBy){
            if(splittedSortBy.length !== 2){
                throw new Error('The format of the sortBy field must be: "startDate|endDate asc|desc"')
            }
            let validSortKey = [
                'startDate',
                'endDate',
            ]
            if(!validSortKey.includes(splittedSortBy[0])){
                throw new Error('Invalid Sort Key');
            }
            if(splittedSortBy[1] != 'asc' && splittedSortBy[1] != 'desc' ){
                throw new Error('valid sorting value is either asc or desc');
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

        let lowerCasedStatus:string[] = [];
        if (status){
            if(Array.isArray(status)){
                for (const item of status){
                    if(typeof item != "string"){
                        throw new Error('Value inside shift_id array must be a string')
                    }
                }
                lowerCasedStatus = status.map( (items:string) => items.toLowerCase());
            }else{
                throw new Error('status field must be an array')
            }
        }


        let query = {
            ...(companyId && {owner: companyId }),
            ...(projectName && {project_title: {$regex:new RegExp(`^${projectName}`,'i')}}),
            ...(tags && {tags: {$all: [...lowerCasedTags]}}),
            ...(startsAt && {start_date: {$gte:DateTime.fromSQL(startsAt).toJSDate()}}),
            ...(status && {status: {$in: lowerCasedStatus}}),
            ...((userStatus && userStatus === 'joined') && {approved_applicants:userId}),
            ...((userStatus && userStatus === 'pending') && {potential_applicants: userId}),
            ...((userStatus && userStatus === 'invited') && {invited_applicants: userId}),
            ...((!userStatus && userId) && { $or: [{potential_applicants: userId}, {approved_applicants:userId}, {invited_applicants: userId}]}),
        }



        let populate = [
            {
                path: 'owner',
                select: 'userName',
                model:'User',
            }
        ]

        let sort = {
            ...(splittedSortBy[0] === 'startDate' && {start_date:splittedSortBy[1]}),
            ...(splittedSortBy[0] === 'endDate' && {end_date:splittedSortBy[1]}),
        }

        const myCustomLabels = {
            totalDocs: 'amountOfProjects',
            docs: 'projectArray',
            limit: 'size',
            page: 'currentPage'
        };
        
        const options = {
            page,
            ...(Object.keys(sort).length > 0 && {sort}),
            limit: size,
            populate,
            projection: "-__v",
            lean: true,
            leanWithId: true,
            customLabels: myCustomLabels,
            useCustomCountFn: async () => {
                let count = await Project.countDocuments(query);
                return count;
            }
        }
  
        let projects = await ProjectPaginate.paginate(query, options);
        let {projectArray, ...rest} = projects;
        let projectsList = Array.isArray(projectArray)?projectArray.map((e) => {
            let {_id, ...otherFields} = e;
            return {
                ...otherFields
            }
        }):[]
        return response_success(res,{projectsList, ...rest},"Request Success")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

// view project details by ID
export async function getProjectById(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id; // Get the project ID from the request parameters
        // Find the project by ID in the database
        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, 'Project not found');
        }
        
        return response_success(res, project, 'Project retrieved successfully');
    } catch (error:any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_bad_request(res,error.message);
    }
}


// update project status to completed, ongoing
export async function updateProjectStatus(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const { newStatus } = req.body;
        const userId = req.body["_id"];
        // Validate the project status
        if (!Object.values(ProjectStatus).includes(newStatus)) {
            return response_bad_request(res, "Invalid new status provided. e.g. ongoing, new or completed");
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, "Project not found");
        }
        if(project.owner.toString() !== userId){
            return response_unauthorized(res, "You are not authorised to update this project");
        }
        project.status = newStatus;
        const updatedProject = await project.save();

        return response_success(res, updatedProject, `Project status updated to ${newStatus}`);
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}

// Company users can edit their project details, and have the option to delete the project.
export async function editProjectDetails(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const userId = req.body["_id"];
        const updatedDetails = req.body;
        const project:any = await Project.findById(projectId);

        // Define which fields can be edited
        const editableFields: (keyof IProject)[] = [
            'project_title',
            'tags',
            'description',
            'start_date',
            'end_date',
            'No_professional',
            'expected_working_hours',
            'skills',
            'experiences',
            'online_offline',
            'price_budget',
            'req_prof_criteria'
        ];
        if (project === null) {
            return response_bad_request(res, "Project not found.");
        }
        // Check if the user making the request is the owner of the project if the user is not an admin
        if(req.body['role'] !== 'admin'){
            if (project.owner.toString() !== userId) {
                return response_bad_request(res, "Only the project owner and the website admin can edit the details of this project.");
            }
        } 
        // Update the fields
        editableFields.forEach(field => {
            if (req.body[field]) {
                project[field] = req.body[field];
            }
        });
        // Save the updated project
        await project.save();
        await project.save();
        return response_success(res, project, `Project details updated for ${project}`);
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
};

// Company users can delete their listed projects
export async function deleteProject(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const userId = req.body["_id"];
        // Fetch the project by its ID
        const project = await Project.findById(projectId);
        if (!project) {
            return response_bad_request(res, "Project not found.");
        }
    
         // Check if the user making the request is the owner of the project if the user is not an admin
        if(req.body['role'] !== 'admin'){
            if (project.owner.toString() !== userId) {
                return response_bad_request(res, "Only the project owner and the website admin can delete this project.");
            }
        }
        let ratingsAssociatedTotheProject = await Rating.find({projectId});
        for(let x = 0 ; x < ratingsAssociatedTotheProject.length; x ++){
            let rating = ratingsAssociatedTotheProject[x];
            if(rating.ratingType == 'Professional') {
                await Rating.findByIdAndDelete(rating._id.toString());
                await recalculateProfessionalRating(rating.userId.toString());
            } else {
                await Rating.findByIdAndDelete(rating._id.toString());
            }
        }
        await Project.findByIdAndDelete(projectId);
        await recalculateCompanyRating(userId);
        return response_success(res, "Project deleted successfully!");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}
    

// Join project
export async function requestJoinProject(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const userId = req.body["_id"];
        // get from database based on userId
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);
        
        if (!user) {
            return response_not_found(res, "User not found");
        }
        if (!project) {
            return response_not_found(res, "Project not found");
        }
        // Check if user has already requested to join
        if (project.potential_applicants.includes(userId)) {
            return response_bad_request(res, "You've already requested to join this project");
        }
        // Check if user has already been accepted
        if (project.approved_applicants.includes(userId)) {
            return response_bad_request(res, "You've already approved to join this project");
        }

        let mailOptions = {}
        let responseMessage = ''
       
        project.potential_applicants.push(userId);
        // Email content
        mailOptions = {
            from: 'okaybuddy646@gmail.com',
            to: user.email,
            subject: `Confirmation for requested project - ${project.project_title}`,
            text: `Your request to join '${project.project_title}' has been sent.\n
                You will get an update on the status of your application soon.\n
                `,
        };
        responseMessage = 'Request to join project submitted successfully';
        
        const updatedProject = await project.save();
        //Send confirmation email to user
        //Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'okaybuddy646@gmail.com',
                pass: 'hezg ldar imjg rkkm',
            },
        });
    
        // Send the email
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
                return response_internal_server_error(res,'Failed to send request confirmation email');
            } else {
                console.log('Email sent:', info.response);
                return response_success(res, "request to join email sent successfully");
            }
        });
        return response_success(res, updatedProject, responseMessage);
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}

//approve or reject professionals
export async function manageProfessionalRequest(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const userId = req.params.userId;
        const action = req.params.action;
        const ownerId = req.body["_id"];

        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, "Project not found");
        }

        // only owner can manage
        if (project.owner.toString() !== ownerId.toString()) {
            return response_unauthorized(res, "Only the project owner can manage professional requests.");
        }
        // Check if user has requested to join the project
        const potentialApplicants = project.potential_applicants.map((applicant) => applicant.toString());
        if(action === "approve" || action === "reject") {
            if (!potentialApplicants.includes(userId)) {
                return response_bad_request(res, "User has not requested to join this project.");
            }
        }
        const approvedApplicants = project.approved_applicants.map((applicant) => applicant.toString());
        if(action === "remove") {
            if (!approvedApplicants.includes(userId)) {
                return response_bad_request(res, "User has not been approved to be in the project");
            }
        }

        
        //set up email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'okaybuddy646@gmail.com',
                pass: 'hezg ldar imjg rkkm',
            },
        });
        
        const professional = await User.findById(userId);
        if (!professional || !professional.email) {
            return response_bad_request(res, "Professional not found or missing email.");
        }
        let mailOptions = {}
        //approve or reject
        if (action === "approve") {
            project.potential_applicants = project.potential_applicants.filter((requestId) => requestId.toString() !== userId);
            project.invited_applicants = project.invited_applicants.filter((requestId) => requestId.toString() !== userId);
            const userIdApproved = new mongoose.Types.ObjectId(userId);
            project.approved_applicants.push(userIdApproved);
            mailOptions = {
                from: 'okaybuddy646@gmail.com',
                to: professional.email,
                subject: `Approval to Join Project - ${project.project_title}`,
                text: `You have been approved to join the project '${project.project_title}' as a professional.`,
            };
        } else if (action === "reject") {
            project.potential_applicants = project.potential_applicants.filter((requestId) => requestId.toString() !== userId);
            project.invited_applicants = project.invited_applicants.filter((requestId) => requestId.toString() !== userId);
            mailOptions = {
                from: 'okaybuddy646@gmail.com',
                to: professional.email,
                subject: `Rejection to Join Project - ${project.project_title}`,
                text: `You have been rejected to join the project '${project.project_title}' as a professional.`,
            };
        } else if (action === "remove") {
            project.approved_applicants = project.approved_applicants.filter((requestId) => requestId.toString() !== userId);
            mailOptions = {
                from: 'okaybuddy646@gmail.com',
                to: professional.email,
                subject: `Removed From Project - ${project.project_title}`,
                text: `You have been removed from the project '${project.project_title}'`,
            };
        }  
        else {
            return response_bad_request(res, "Invalid action. Use 'approve' or 'reject'.");
        }
        // Send the email
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        const updatedProject = await project.save();
        const message = action === "approve" ? "Professional approved successfully" : action === "remove"?"Professional removed succesfully":"Professional rejected successfully";
        return response_success(res, updatedProject, message);
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}

// view professionals who are approved to join the project
export async function viewApprovedProfessionals(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id;
        const ownerId = req.body["_id"];

        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, "Project not found");
        }

        // Only owner of project can view approved professionals
        if (project.owner.toString() !== ownerId.toString()) {
            return response_unauthorized(res, "Only the project owner can view approved professionals.");
        }

        //get user data from user database where id = to any id in project.approved_applicants
        const approvedProfessionals = await User.find({ _id: { $in: project.approved_applicants } });
        return response_success(res, approvedProfessionals, "Approved professionals retrieved successfully for the project");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}

// send email to invite professionals
export async function inviteProfessional(req: Request, res: Response): Promise<Response> {
    try {
        const { professionalEmail, projectId, link } = req.body;
        const ownerId = req.body["_id"];
        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, "Project not found");
        }
        if (project.owner.toString() !== ownerId.toString()) {
            return response_unauthorized(res, "Only the project owner can send invitations.");
        }
        
        // update invited applicants
        const professional = await User.findOne({ email: professionalEmail });
        if (!professional) {
            return response_not_found(res, "Professional with the given email not found.");
        }

        // Update invited applicants
        const professionalId = new mongoose.Types.ObjectId(professional._id);
        project.invited_applicants.push(professionalId);
        const updatedProject = await project.save();

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
            to: professionalEmail,
            subject: `Invitation to Join Project - ${project.project_title}`,
            text: `You are invited to join the project '${project.project_title}' as a professional.\n
                Click the link below to accept the invitation:\n
                ${link}`,
        };
    
        // Send the email
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
                return response_internal_server_error(res,'Failed to send the invitation email');
            } else {
                console.log('Email sent:', info.response);
                return response_success(res, "Invitation email sent successfully");
            }
        });
        return response_success(res, updatedProject, "Succesfully send email");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}

export async function getReviews(req: Request, res: Response): Promise<Response> {
    try {
        const { size, page } = req.body;
        const projectId = req.params.id;
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

        const project = await Project.findById(projectId);
        if (!project) {
            return response_not_found(res, "Project not found");
        }
        if (project.status != "completed") {
            return response_forbidden(res, "Project not completed, cannot get reviews for it yet!");
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
            }
        ]

        let query = {
            projectId,
            ratingType: "Company"
        }

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