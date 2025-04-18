import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  location: { 
    venue:{
        type: String, required: true
    },
    city:{
        type: String, required: true
    }
     },
  description: { type: String },
  
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event