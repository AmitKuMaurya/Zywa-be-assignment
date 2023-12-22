import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const DB_connection = async () => {
    //process.env.MONGO_URI
    return await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log({msg : "DB Connected !"})
    })
    .catch((err)=>{
        console.log({err : err});
    })
}