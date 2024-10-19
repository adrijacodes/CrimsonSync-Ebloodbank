import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongodburl=process.env.MONGO_URI

async function connectDb(){
    try{
        if(mongoose.connection.readyState!=1){
            if (!mongodburl) {
                throw new Error("MONGO_URI is not defined in the environment variables");
            }
            await mongoose.connect(mongodburl);
            console.log("Database connected");
            console.log(mongoose.connection.host);    
            
        }
        else{
            console.log("Database already connected");
            
        }
    }
    catch(error){
        console.error(error);
        
    }
}
export  default connectDb
