import type { Request, Response } from 'express';
import { DateTime } from "luxon";
import { response_bad_request, response_success, response_internal_server_error, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import Project from '@mongodb/projectModel';
import Rating from 'mongodb/ratingModel'
import { recalculateProfessionalRating, recalculateProjectRating, recalculateCompanyRating } from '@utils/utils';

// Api Function that get the statistics required for the admin dashboard
export async function getStatistics(req: Request, res: Response): Promise<Response> { 
    try {
        const {year} = req.body;
        let required_fields = [
			'year',
		];

        //Ensure its a year
        let regexp = new RegExp(/^\d{4}$/);
        if(!regexp.test(year)) {
            throw new Error('Invalid Year Format');
        }

        let amountOfProfessionalUser = await User.countDocuments({userType:"professional"}); //Get the amount of professional user in the system
        let amountOfCompanyUser = await User.countDocuments({userType:"company"}); //Get the amount of company user in the system

        const statisticsStartDate = DateTime.fromObject( //Create a date object which is the january 1st, 00:01:00 of the specified year
            {
                year:Number(year),
                month: 1,
                day: 1,
                hour:0,
                minute:0,
                second:0,
                millisecond:0,
            }
        ).toJSDate();
        
        const statisticsEndDate = DateTime.fromObject( //Create a date object which is the 31 decebmer, 23:59:59 of the specified year
            {
                year:Number(year),
                month: 12,
                day: 31,
                hour:23,
                minute:59,
                second:59,
                millisecond:59,
            }
        ).toJSDate();
        
        let amountOfCreatedProjects = await Project.countDocuments({start_date:{$gte:statisticsStartDate, $lte:statisticsEndDate}}); //Get the amount of project created that specific year
        let amountOfCreatedProjectsWithEndDateSameYear = await Project.countDocuments({start_date:{$gte:statisticsStartDate, $lte:statisticsEndDate},end_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}}); //Get projects created that year that also ends in the same year
        let amountOfProjectsTillSpecificYear = await Project.countDocuments({end_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}}); //Get all projects that ends that specific year
        let amountOfOngoingProjects = await Project.countDocuments({start_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}, status:"ongoing"}); //Get all project that is made on the specific year whose status is ongoing
        let amountOfCompletedProjects = await Project.countDocuments({end_date:{$gte:statisticsStartDate, $lte:statisticsEndDate},status:"completed"}); //Get all projects that ends that year whose status is completed
     

        let response = {
            professionalUser: amountOfProfessionalUser,
            companyUser: amountOfCompanyUser,
            projectsPerYear: amountOfProjectsTillSpecificYear + amountOfCreatedProjects - amountOfCreatedProjectsWithEndDateSameYear,
            ongoingProjects: amountOfOngoingProjects,
            completedProjects: amountOfCompletedProjects,
            newProjectsPerYear: amountOfCreatedProjects
        }

        return response_success(res,{...response},'Successfuly fetched statistics')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> { //API Function that lets an admin to delete a user
    try {
        const userId = req.params.id;

        let user = await User.findById(userId);
        if( user === null || user === undefined){
            return response_not_found(res,'User not found');
        } 

        if (user.userType == 'professional') { // If the user is a professional
            let projectsAssociatedToUser = await Project.find({ $or: [{potential_applicants: userId}, {approved_applicants:userId}, {invited_applicants: userId}]}) 
            for (let i = 0 ; i < projectsAssociatedToUser.length; i++){ //Recursively remove the deleted user from any projects that the user was involved in
                let projectId = projectsAssociatedToUser[i]._id.toString();
                await Project.findByIdAndUpdate(projectId, {$pull: {potential_applicants: userId, approved_applicants:userId, invited_applicants: userId}});
                let ratingsAssociatedToUser = await Rating.find({userId, projectId: projectId});
                let userHasRated = false;
                for (let x = 0; x < ratingsAssociatedToUser.length; x++ ){ //Recurisively remove all the ratings that is related to the user
                    let rating = ratingsAssociatedToUser[x];
                    if(rating.ratingType == 'Company') { //If its a review given by the user to a project, then remove it and recalculate the average rating of the project
                        userHasRated = true;
                    } 
                    await Rating.findByIdAndDelete(rating._id.toString());
                    
                }
                if(userHasRated){
                    await recalculateProjectRating(projectId);
                    await recalculateCompanyRating(projectsAssociatedToUser[i].owner.toString());
                }
            }
        }
        else if (user.userType == 'company') { // If the user is a company user
            let projectsAssociatedToCompany = await Project.find({owner: userId}); //Delete all projects related to the company user
            for (let i = 0; i < projectsAssociatedToCompany.length; i++ ){
                let projectId = projectsAssociatedToCompany[i]._id.toString();
                let ratingsAssociatedTotheProject = await Rating.find({projectId});
                for(let x = 0 ; x < ratingsAssociatedTotheProject.length; x ++){ //recursively delete all reviews correlated to the deleted project
                    let rating = ratingsAssociatedTotheProject[x];
                    if(rating.ratingType == 'Professional') { //If the review type is a professional user review, then delete it and recalculate the affected professional user rating
                        await Rating.findByIdAndDelete(rating._id.toString());
                        await recalculateProfessionalRating(rating.userId.toString());
                    } else {
                        await Rating.findByIdAndDelete(rating._id.toString());
                    }
                }
                await Project.findByIdAndDelete(projectId);
            }
        }
        await User.findByIdAndDelete(userId);

        return response_success(res,{},'Successfuly Deleted User')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}