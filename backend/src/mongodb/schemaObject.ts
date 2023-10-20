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
    tags: [String]
}

