import { Schema, InferSchemaType , model} from 'mongoose';
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

type Token = InferSchemaType<typeof tokenSchema>;

const token = model('Token', tokenSchema);

export default token;