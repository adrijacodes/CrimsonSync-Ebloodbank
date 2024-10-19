import express from "express"
import {searchdonors} from "../controllers/searchdonorcontroller.js"
const router=express.Router()

router.post('/',searchdonors)

export default router