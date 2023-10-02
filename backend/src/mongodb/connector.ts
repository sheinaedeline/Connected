import * as mongoose from 'mongoose';

export default async function mongoDBConnector():Promise<void> {
    try{
        console.log(`${process.env.MONGODB_URL}/webApp`)
        await mongoose.connect(`${process.env.MONGODB_URL}/webApp`);
        console.log("MongoDB database succesfully connected");
    } catch(error:any) {
        console.log(error)
    }
}