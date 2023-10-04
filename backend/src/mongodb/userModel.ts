import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
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
    name: {
        type: String,
        trim: true,
        required: true
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
});

userSchema.methods.comparePassword = function(password:string) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', userSchema);

export default User;