import { DateTime } from "luxon";
import { Types } from "mongoose";
import Rating from "@mongodb/ratingModel";
import Project from "@mongodb/projectModel";
import User from "@mongodb/userModel";

export const check_req_field = (req_field:any):Boolean => {
    if (req_field == null || req_field == ''){
        return false;
    }
    return true;
}

export const valid_email = (email:string):boolean => {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

export const getCurrentTime = ():DateTime => {
    return DateTime.local();
}


export const valid_abn = (abn:string):boolean => {
    let regexp = new RegExp(/^(\d *?){11}$/);
    return regexp.test(abn);
}


export const valid_phone_number = (phone_number:string):boolean =>{
    let regexp = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    return regexp.test(phone_number)
}

export const sql_date_string_checker = (iso_string:string):Boolean => {
    var luxonDate = DateTime.fromSQL(iso_string,{
        zone:"utc"
    });

    return luxonDate.isValid;
}

export const idToObjectId = (id:string):Types.ObjectId => {
    let _id = new Types.ObjectId(id);
    return _id;
}

export const recalculateProjectRating = async (projectId: string):Promise<number|null> => {
        // Calculate the average rating of the project
        const allRatings = await Rating.find({ projectId, ratingType: "Company" });
        const averageRating = allRatings.length > 0 ? allRatings.reduce((acc, { ratings }) => acc + ratings, 0) / allRatings.length : null;
        let updateOptions = averageRating == null ? {
            $unset : {averageProjectRating: 1}
        } : {
            averageProjectRating: averageRating
        }
        // Update the project's average rating
        await Project.findByIdAndUpdate(projectId, updateOptions);
        
        return averageRating;
}

export const recalculateProfessionalRating = async (userId: string):Promise<number|null> => {
    // Calculate the average rating of the user
    const allRatings = await Rating.find({ userId, ratingType: "Professional" });
    const averageRating = allRatings.length > 0 ? allRatings.reduce((acc, { ratings }) => acc + ratings, 0) / allRatings.length: null;
    let updateOptions = averageRating == null ? {
        $unset : {averageUserRating: 1}
    } : {
        averageUserRating: averageRating
    }
    // Update the user's average rating
    await User.findByIdAndUpdate(userId, updateOptions );
    return averageRating;
}

export const recalculateCompanyRating = async (ownerId: string):Promise<number|null> => {
    const projects = await Project.find({ owner: ownerId, averageProjectRating: { $ne: null }});
        
    // Calculate the average rating for the owner/company
    const averageOwnerRating = projects.length > 0
        ? projects.reduce((acc, project) => acc + (project.averageProjectRating || 0), 0) / projects.length
        : null;
    let updateOptions = averageOwnerRating == null ? {
        $unset : {averageUserRating: 1}
    } : {
        averageUserRating: averageOwnerRating
    }
    await User.findByIdAndUpdate(ownerId, updateOptions );
    return averageOwnerRating;
}