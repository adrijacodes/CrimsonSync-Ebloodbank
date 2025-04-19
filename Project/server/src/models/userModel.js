//@ts-nocheck
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { TOKENEXPIRY, TOKENSECRETKEY } from "../../envAccess.js";
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
        type: Boolean, default: true
     },  
     availability:{
        type: String, enum: ['MON', 'TUES', 'WED','THURS','FRI','SAT','SUN','NONE'], default: 'NONE'
     },
     userBloodDonationHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BloodRequests"
      }],
    role: { 
        type: String, enum: ['recipient', 'donor','BOTH' ], default: 'recipient' 
    }, 
  }, { timestamps: true }
)


userSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
userSchema.methods.passwordValidityCheck = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false;
    }
  };
userSchema.methods.generateUserAccessToken = async function () {
  const token = jwt.sign(
    {
      email: this.email,
    },
    TOKENSECRETKEY,
    { expiresIn: TOKENEXPIRY }
  );
  
  return token;
};


const User=mongoose.model("Users",userSchema)
export  default User