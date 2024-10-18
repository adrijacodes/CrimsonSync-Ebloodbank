import mongoose from "mongoose";
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:
     { 
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
    role: { 
        type: String, enum: ['recipient', 'donor', 'both'], default: 'both' 
    }, 
  }, { timestamps: true }
)

const User=mongoose.model("Users",userSchema)
export {User}