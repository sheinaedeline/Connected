import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
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
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function(password:string) {
    return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', userSchema);

export default User;