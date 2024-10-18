import express from "express"
import mongoose from 'mongoose'

import cors from "cors"
import morgan from "morgan"
import authRouter from "../routes/authRoute.js"

const app=express()


app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); 


app.get('/',(req,res)=>{
    res.send("Hello WORLD")
})
app.use('/api/auth',authRouter)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

export {app}