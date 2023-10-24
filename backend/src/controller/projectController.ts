//Bootstrap Code
import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import { AuthorizeTokenResponse } from '@interfaces/authInterface'; 
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime } from '@utils/utils';
import {generateNewToken, getTokenFromHeader,deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
export type {IUser} from '@interfaces/mongoDBInterfaces'
import Project, { IProject } from '@mongodb/projectModel';
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
        // console.log(project_title)
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
            tags,
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

        // console.log(savedProject._id.toString());
        return response_success(res,savedProject,"Succesfully Created Project");

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_bad_request(error);
    }
}

// View All Available Projects
export async function getProjects(req: Request, res: Response): Promise<Response> {
    try {
        // Retrieve all projects from the database
        const projects = await Project.find();
        console.log(projects)
        return response_success(res,projects,"Succesfully Get Project");
    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_bad_request(res,error.message);
    }
}

// Company users can view their own projects
export async function getMyCompanyProjects(req: Request, res: Response): Promise<Response> {
    try {
        const userID = req.body["_id"];
        // Query the Project collection to retrieve all projects associated with the company
        const companyProjects = await Project.find({ owner: userID });
        // Check if the company has any projects
        if (!companyProjects || companyProjects.length === 0) {
            return response_not_found(res, "No projects found for your company");
        }
        // Return the fetched projects in the response
        return response_success(res, companyProjects, "Projects retrieved successfully for your company");

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message);
    }
}

// Professional users or other company users can view a company's projects by looking up owner ID.
export async function getCompanyProjects(req: Request, res: Response): Promise<Response> {
    try {
        const ownerID = req.params.ownerID
        // Query the Project collection to retrieve all projects associated with the company
        const companyProjects = await Project.find({ owner: ownerID });
        // Check if the company has any projects
        if (!companyProjects || companyProjects.length === 0) {
            return response_not_found(res, "No projects found for this company");
        }
        // Return the fetched projects in the response
        return response_success(res, companyProjects, "Projects retrieved successfully for the company");

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message);
    }
}

// view project details by ID
export async function getProjectById(req: Request, res: Response): Promise<Response> {
    try {
        const projectId = req.params.id; // Get the project ID from the request parameters
        console.log(projectId)
        // Find the project by ID in the database
        const project = await Project.findById(projectId);
        console.log(projectId, project)
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
        console.log('user id: ',userId)
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
        const project = await Project.findById(projectId);

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
        // console.log(project)
        // console.log(updatedDetails)
        if (project === null) {
            return response_bad_request(res, "Project not found.");
        }
        // Check if the user making the request is the owner of the project
        if (project.owner.toString() !== userId) {
            return response_bad_request(res, "Only the project owner can edit the details of this project.");
        }
        // Update the fields
        editableFields.forEach(field => {
            if (req.body[field]) {
                project[field] = req.body[field];
            }
        });
        // Save the updated project
        await project.save();
        // console.log(project)
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
        // Check if the user making the request is the owner of the project
        if (project.owner.toString() !== userId) {
            return response_bad_request(res, "Only the project owner can delete this project.");
        }

        await Project.findByIdAndDelete(projectId);
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
        // update potential applicants
        project.potential_applicants.push(userId);
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
    
        // Email content
        const mailOptions = {
            from: 'okaybuddy646@gmail.com',
            to: user.email,
            subject: `Confirmation for requested project - ${project.project_title}`,
            text: `Your request to join '${project.project_title}' has been sent.\n
                You will get an update on the status of your application soon.\n
                `,
        };
    
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
        return response_success(res, updatedProject, "Request to join project submitted successfully");
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
        if (!potentialApplicants.includes(userId)) {
            return response_bad_request(res, "User has not requested to join this project.");
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
            mailOptions = {
                from: 'okaybuddy646@gmail.com',
                to: professional.email,
                subject: `Rejection to Join Project - ${project.project_title}`,
                text: `You have been rejected to join the project '${project.project_title}' as a professional.`,
            };
        } else {
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
        const message = action === "approve" ? "Professional approved successfully" : "Professional rejected successfully";
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
        return response_success(res, "Succesfully send email");
    } catch (error: any) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return response_internal_server_error(res, error.message);
    }
}