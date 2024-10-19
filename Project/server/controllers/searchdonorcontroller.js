import {User} from "../src/models/userModel.js"


export const searchdonors=async(req,res,next)=>{
    const {city,state,bloodType}=req.body
    console.log(req.body)
    //const urgency = urgencyType.toLowerCase()
    try{
        const availableDonors=await User.find({
            "location.city":city,
            "location.state":state,
            bloodType:bloodType,
            isDonor:true
        })
        console.log(availableDonors);
        
        if (availableDonors.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No matches found!" 
            });
        }
        const usernames = availableDonors.map(donor => donor.username);
        
        
        res.status(200).json({
            success: true,
            data: usernames
        });
    }
    catch(error)
    {
        error.statusCode = 400;  
        error.message="No matches found!" 
        next(error);  
    }
}
