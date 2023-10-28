import Token from '@mongodb/tokenModel';
import * as jwt from 'jsonwebtoken';
import {getCurrentTime} from '@utils/utils';
import token from '@mongodb/tokenModel';
import type {AuthorizeTokenResponse } from '@interfaces/authInterface';
import type { Request, Response, NextFunction} from 'express';
import {response_unauthorized, response_bad_request} from '@utils/responseUtils';
import { verify } from 'crypto';

export const getTokenFromHeader = (token_header:string[]):string => {
    const token = token_header?.length == 3? token_header[2]:token_header?token_header[1]:"";
    return token;
}

export const deleteToken = async (token:string):Promise<void> => {
    await Token.findOneAndDelete({jwtString:token});
}

export const deactivateCurrentUserToken = async (userId:string):Promise<void> => {
    const tokenEntry = await Token.findOne({jwtUserID:userId});
    if(tokenEntry == null){
        return;
    } else{
        await deleteToken(tokenEntry.jwtString);
    }
}

export const generateNewToken = async (email:string , userType: string, userId:string):Promise<string> => {
    await deactivateCurrentUserToken(userId);
    const secret:string = process.env.SECRET?process.env.SECRET:"none";
    const jwtToken = jwt.sign({ email: email, role: userType, _id: userId}, secret,{expiresIn:86300});
    let newJwtToken = new Token({
        jwtTokenCreationDate: getCurrentTime().toJSDate(),
        jwtString: jwtToken,
        jwtUserID: userId
    });
    await newJwtToken.save();
    return jwtToken;
}

export const authorizeToken = async (req:Request): Promise<AuthorizeTokenResponse> => { 
    const token_header = req.headers.authorization?.split(" ");
    const token = getTokenFromHeader(token_header?token_header:[]);
    const secret:string = process.env.SECRET?process.env.SECRET:"none";
    let authorizeTokenResponse: AuthorizeTokenResponse = {
        status:"",
        decodedToken:"",
        tokenString: token
    }
    jwt.verify(token, secret, function(err, decode) {
        if (err) {
            authorizeTokenResponse.status = "invalid";
        }
        else{
            authorizeTokenResponse.status ="valid";
            authorizeTokenResponse.decodedToken = decode;
        }
    })
    if(authorizeTokenResponse.status = "valid"){
        const tokenInDB = await Token.findOne({jwtString: token});
        if(tokenInDB == null){
            authorizeTokenResponse.status ="invalid";
        }
    }
    return authorizeTokenResponse;
}

/*
Middleware that checks for the role of the user using the token provided in the header, value should either be professional, company, admin,
or any(any means that it doesnt care what the user role is and is just used to check if a valid token is used).

To use this function just add import and add the function to the route before your main function
for example if you are creating a login function where the route looks like:
'route.post("/login",login)
Then you want to modify it so that the api can only be called by a professional user then change it to:
'route.post("login"/,checkForRole,login)

Also adds the _id property to the request object
*/
export function checkForRole(role:string="any", mode:string = "required") {
    return async function roleMiddleware(req: Request, res: Response, next:NextFunction) {
        let authorizedTokenObject:AuthorizeTokenResponse = await authorizeToken(req);
        if (authorizedTokenObject.status == "invalid" && mode == "required"){
            return response_bad_request(res,"Invalid Token");
        } else if (authorizedTokenObject.decodedToken.role != role && role!== "any" && authorizedTokenObject.decodedToken.role != "admin"){
            return response_unauthorized(res,"Invalid Access Level");
        } else {
            if(authorizedTokenObject.decodedToken._id) {
                req.body["_id"] = authorizedTokenObject.decodedToken._id;
            }
            if(authorizedTokenObject.decodedToken.role) {
                req.body["role"] = authorizedTokenObject.decodedToken.role; 
            }
            next();
        }
    } 
}


