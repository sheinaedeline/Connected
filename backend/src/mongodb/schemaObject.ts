import { Schema} from 'mongoose';

export const userObj = {
    userType: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    abn: {
        type: String,
        trim: true
    },
    socialURL: {
        type: String,
        trim: true
    },
    hash_password: {
        type: String
    },
    industryType: {
        type: String,
        trim: true
    },
    tags: [String],
    averageUserRating: {
        type: Number
    },
    userImage: {
        type: String,

    },
    userFile: {
        type: String,
    }
    
}

export const projectObj = {
    owner: {
        type: Schema.Types.ObjectId,
        // ref: 'User', // Reference to the User model
        // required: true,
    },
    project_title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    No_professional: {
        type: String,
        required: true,
    },
    expected_working_hours: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
    },
    experiences: {
        type: String,
    },
    online_offline: {
        type: String,
        required: true,
    },
    price_budget: {
        type: String,
    },
    req_prof_criteria: {
        type: String,
    },
    status: {
        type: String,
    },
    potential_applicants: {
        type: [Schema.Types.ObjectId],
    },
    approved_applicants: {
        type: [Schema.Types.ObjectId],
    },
    averageProjectRating: {
        type: Number
    },
    invited_applicants: {
        type: [Schema.Types.ObjectId],
    }
}

export const ratingObj = {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    ratingType: {
      type: String, // either a rating for professional or a rating for a project
      required: true,
    },
    review: {
      type: String,
    }
}