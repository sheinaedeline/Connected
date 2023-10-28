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
        )

        const statisticsEndDate = DateTime.fromObject(
            {
                year:Number(year)+1,
                month: 1,
                day: 1,
                hour:0,
                minute:0,
                second:0,
                millisecond:0,
            }
        )
        
        let response = {
            professionalUser: amountOfProfessionalUser,
            companyUser: amountOfCompanyUser
        }

        return response_success(res,{...response},'Successfuly fetched statistics')

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}