// import {User} from "../src/models/userModel.js"
// import {generateUsername} from "../utils/usernamegenerate.js"
// import bcryptjs from "bcryptjs"



// export const register=async(req,res,next)=>{
//    const {name,email,password}=req.body
//    const hashedPassword=bcryptjs.hashSync(password,10)
//    const username= generateUsername();
//     const newUser=new User({name,email,password:hashedPassword,username:username})
//     try{
//         await newUser.save();
//         res.status(201).json({message:"user created successfully"})
//     }
//     catch(error){
//             error.statusCode = 400;   
//         next(error);
//     }
//     }
    
// export const login=async (req,res,next) => {
//     const {email,password}=req.body
// }