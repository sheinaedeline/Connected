//Bootstrap Code
import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User, { IUser } from '@mongodb/userModel';
import { AuthorizeTokenResponse } from '@interfaces/authInterface'; 
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime } from '@utils/utils';
import {generateNewToken, getTokenFromHeader,deleteToken} from '@utils/authUtils';
import * as bcrypt from 'bcrypt';
export type {IUser} from '@mongodb/userModel'
import Project, { IProject } from '@mongodb/projectModel';

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
        console.log(project_title)
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
        });
        
        const savedProject = await newProject.save();

        console.log(savedProject._id.toString());
        return res.status(201).json(savedProject);

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get a list of projects
export async function getProjects(req: Request, res: Response): Promise<Response> {
    try {
        // Retrieve all projects from the database
        const projects = await Project.find();
        // console.log(projects)
        return res.status(200).json(projects);
    } catch (error) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// view project detail by ID
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
    } catch (error) {
        if (error instanceof Error) {
            return response_bad_request(res, error.message);
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }