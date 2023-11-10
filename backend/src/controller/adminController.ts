import type { Request, Response } from 'express';
import { DateTime } from "luxon";
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import Project from '@mongodb/projectModel';
import Rating from 'mongodb/ratingModel'
import { recalculateProfessionalRating, recalculateProjectRating } from '@utils/utils';


export async function getStatistics(req: Request, res: Response): Promise<Response> {
    try {
        const {year} = req.body;
        let required_fields = [
			'year',
		];

        let regexp = new RegExp(/^\d{4}$/);
        if(!regexp.test(year)) {
            throw new Error('Invalid Year Format');
        }

        let amountOfProfessionalUser = await User.countDocuments({userType:"professional"});
        let amountOfCompanyUser = await User.countDocuments({userType:"company"});



        const statisticsStartDate = DateTime.fromObject(
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
        
        const statisticsEndDate = DateTime.fromObject(
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
        
                
        let amountOfProfessionalUserCreated = await User.countDocuments({userType:"professional", created_at: {$gte:statisticsStartDate, $lte:statisticsEndDate}});
        let amountOfCompanyUserCreated = await User.countDocuments({userType:"company", created_at: {$gte:statisticsStartDate, $lte:statisticsEndDate}});
        let amountOfCreatedProjects = await Project.countDocuments({start_date:{$gte:statisticsStartDate, $lte:statisticsEndDate}});
        let amountOfCreatedProjectsWithEndDateSameYear = await Project.countDocuments({start_date:{$gte:statisticsStartDate, $lte:statisticsEndDate},end_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}});
        let amountOfProjectsTillSpecificYear = await Project.countDocuments({end_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}});
        let amountOfOngoingProjects = await Project.countDocuments({start_date:{$gte:statisticsStartDate,$lte:statisticsEndDate}, status:"ongoing"});
        let amountOfCompletedProjects = await Project.countDocuments({end_date:{$gte:statisticsStartDate, $lte:statisticsEndDate},status:"completed"});
     

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

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const userId = req.params.id;

        let user = await User.findById(userId);
        if( user === null || user === undefined){
            return response_not_found(res,'User not found');
        } 

        if (user.userType == 'professional') {
            let projectsAssociatedToUser = await Project.find({ $or: [{potential_applicants: userId}, {approved_applicants:userId}, {invited_applicants: userId}]})
            for (let i = 0 ; i < projectsAssociatedToUser.length; i++){
                let projectId = projectsAssociatedToUser[i]._id.toString();
                await Project.findByIdAndUpdate(projectId, {$pull: {potential_applicants: userId, approved_applicants:userId, invited_applicants: userId}});
            }
            let ratingsAssociatedToUser = await Rating.find({userId});
            for (let i = 0; i < ratingsAssociatedToUser.length; i++ ){
                let rating = ratingsAssociatedToUser[i];
                if(rating.ratingType == 'Company') {
                    await Rating.findByIdAndDelete(rating._id.toString());
                    await recalculateProjectRating(rating.projectId.toString());
                } else {
                    await Rating.findByIdAndDelete(rating._id.toString());
                }
            }
        }
        else if (user.userType == 'company') {
            let projectsAssociatedToCompany = await Project.find({owner: userId});
            for (let i = 0; i < projectsAssociatedToCompany.length; i++ ){
                let projectId = projectsAssociatedToCompany[i]._id.toString();
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