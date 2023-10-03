import type { Request, Response } from 'express';
import { response_bad_request, response_success, response_internal_server_error, response_unauthorized } from '@utils/responseUtils';
import User from '@mongodb/userModel';
import { check_req_field, valid_email } from '@utils/utils';
import * as bcrypt from 'bcrypt';

export async function register(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password, name} = req.body;
        console.log(email);
        const required_fields = [
			'email',
			'password',
            'name'
		];
		for (const fields of required_fields) {
			let valid = check_req_field(req.body[fields])
            if(!valid){
                throw new Error(`${fields} cannot be empty`)
            }
		}
        if(!valid_email(email)){
            throw new Error("Email format invalid");
        }
        console.log(await User.exists({ email}));
        let newUser = new User({
            fullName: name, 
            email: email,
            hash_password : bcrypt.hashSync(password,10)
        })
        let emailExists = await User.exists({ email });
        if (emailExists != null){
            throw new Error(`The email ${email} is already registered`);
        }
        await newUser.save();
        return response_success(res,{name,email},"Successful Registration")

    } catch (error:any) {
        if(error instanceof Error){
            return response_bad_request(res,error.message)
        } 
        return response_internal_server_error(res, error.message)
    }
}
