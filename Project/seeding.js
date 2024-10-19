
import mongoose from "mongoose";
import { User } from "./server/src/models/userModel.js";
import { userdata } from "./server/userdata.js";
import {generateUsername} from "./server/utils/usernamegenerate.js"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv";

dotenv.config();

const mongodburl = process.env.MONGO_URI; 

mongoose.connect(mongodburl)
  .then(() => {
    console.log("Database Connected");
    seedDb(); 
  })
  .catch(err => {
    console.error("Connection error:", err);
  });
  const username= generateUsername();
const seedDb = async () => {
  try {
   
    await User.deleteMany({});
   userdata.forEach(async(user)=>{
    user.password=await bcryptjs.hashSync(user.password,10)
    user.username = generateUsername();
   // console.log(user.password);  
   
   })
   await User.insertMany(userdata); 
    console.log("Seeding done, check the database");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    mongoose.connection.close();
  }
};
