import type { Request, Response } from 'express';
import { DateTime } from "luxon";
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized, response_not_found } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import Project from '@mongodb/projectModel';
import { check_req_field, valid_email, valid_abn, sql_date_string_checker, valid_phone_number, getCurrentTime, idToObjectId } from '@utils/utils';


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
            completedProjects: amountOfCompletedProjects
        }

        return response_success(res,{...response},'Successfuly fetched statistics')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}