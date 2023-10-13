import type { Request, Response, NextFunction } from 'express';
import type { Multer, FileFilterCallback } from 'multer';
import multer from 'multer';
import { response_bad_request} from '@utils/responseUtils';


const multerStorage = multer.memoryStorage();
const upload = multer({fileFilter ,storage: multerStorage});

function fileFilter(_: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
	if(file.size >= 1024 * 1024 * 20){
		cb(new Error("File size must be smaller than 20mb"))
	}
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'application/pdf'
	) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type, only JPEG, PNG, and PDF is allowed!'));
	}
}



export function uploadMiddleware(filename:string,filetype:string = "image",required=true){
    return function(req:Request,res:Response,next:NextFunction){
        const upload_var = upload.single(filename);
        upload_var(req,res,function(err){
            if(required || (required === false && req.file)){
                if(filetype == "image"){
                    if(req.file?.mimetype != 'image/png' && req.file?.mimetype != 'image/jpeg'){
                        return response_bad_request(res,"Image must be a png or jpeg")
                    }
                } else {
                    if(req.file?.mimetype != 'application/pdf'){
                        return response_bad_request(res,"File must be a pdf")
                    }
                }
            }
            if(err instanceof Error){
                return response_bad_request(res,err.message)
            }
            else{
                next();
            }
        })
    }
}