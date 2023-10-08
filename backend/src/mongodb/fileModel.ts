import { Schema, Types, model} from 'mongoose';

const fileSchema = new Schema({
    userID: Types.ObjectId, 
    type: String,
    image: { 
        data: Buffer, 
        contentType: String 
    }
}, { timestamps: true });

const fileModel = model('file', fileSchema);

export default fileModel;