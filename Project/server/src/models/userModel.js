import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:
     { 
        type: String,
         required: true
     },
     username:{
        type: String,
        required: true
     },
    email:
     { 
        type: String, required: true, unique: true 
    },
    password: {
         type: String, required: true 
        },
    bloodType: {
         type: String
        },                          
    location: 
    { 
    
        city:{
            type: String

             },
        state:{
            type: String

             }
    },
    isDonor:
     { type: Boolean, default: false

      },  
    isRecipient: { 
        type: Boolean, default: false
     },  
     urgencyType:{
        type:String,
        enum:['within 2 hours','today','tomorrow','flexible']
     },
     availability:{
        type: String, enum: ['MON', 'TUES', 'WED','THURS','FRI','SAT','SUN','EVERYDAY'],default: ['EVERYDAY']
     },
     userBloodDonationHistory:String,
    role: { 
        type: String, enum: ['recipient', 'donor', 'both'], default: 'both' 
    }, 
  }, { timestamps: true }
)
// userSchema.pre('insertMany',function(next)
// {
//     console.log("preSave");   
//     try {
//       this.password =bcryptjs.hashSync(this.password,10)
//       next(); 
//     } 
//     catch (error) {
//       next(error);
//     }
//   })
const User=mongoose.model("Users",userSchema)
export {User}