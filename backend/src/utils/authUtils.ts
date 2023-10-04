import Token from '@mongodb/tokenModel';
import * as jwt from 'jsonwebtoken';
import {getCurrentTime } from '@utils/utils';
import token from '@mongodb/tokenModel';
import type {Request} from 'express';
import type {AuthoriseTokenResponse } from '@interfaces/authInterface';
import { verify } from 'crypto';
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

export const authoriseToken = async (req:Request): Promise<AuthoriseTokenResponse> => {
    const token_header = req.headers.authorization?.split(" ");
    const token = token_header?.length == 3? token_header[2]:token_header?token_header[1]:"";
    let response_status:Boolean = true;
    const secret:string = process.env.SECRET?process.env.SECRET:"none";
    let authorizeTokenResponse: AuthoriseTokenResponse = {
        status:"",
        decodedToken:"",
        token
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
        const tokenInDB = Token.findOne({jwtString: token})
        if(tokenInDB == null){
            authorizeTokenResponse.status ="invalid";
        }
    }
    return authorizeTokenResponse;
}