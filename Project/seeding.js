// import mongoose from "mongoose";
// import {User} from "./src/models/userModel.js"
// import { userdata } from "./userdata.js"
// import dotenv from "dotenv"
// dotenv.config()

// const mongodburl=process.env.MONGO_URI
// mongoose.connect(mongodburl)
// const db=mongoose.connection;
// db.on('error',console.error.bind(console,"connection error:"));
// db.once("open",()=>{
//     console.log("Database Connected");
    
// });

// const seedDb=async()=>{
//     let myuser=undefined
//     await User.deleteMany({});
//   myuser= new User(userdata)
//     await camp.save().then(()=>{
//         console.log("seeding done check database");
        
//     });
//    }
   

// seedDb().then(()=>{
//     mongoose.connection.close();
// })

import mongoose from "mongoose";
import { User } from "./server/src/models/userModel.js"; // Ensure this path is correct
import { userdata } from "./server/userdata.js"; // Ensure this path is correct
import dotenv from "dotenv";

dotenv.config();

const mongodburl = process.env.MONGO_URI; // Ensure this environment variable is set

mongoose.connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
    seedDb(); // Start seeding after successful connection
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

const seedDb = async () => {
  try {
    // Clear the database
    await User.deleteMany({});

    //const users = userdata.map(user => new User(user)); 

    await User.insertMany(userdata); 

    console.log("Seeding done, check the database");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};
