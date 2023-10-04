import * as mongoose from 'mongoose';
const { Schema } = mongoose;
const tokenSchema = new Schema({
    jwtUserID: {
        type:String,
        trim: true,
        required:true
    },
    jwtString: {
        type:String,
        trim: true,
        required:true
    },
    jwtTokenCreationDate: {
        type: Date,
        expires:86300
    }
});

const token = mongoose.model('Token', tokenSchema);

export default token;