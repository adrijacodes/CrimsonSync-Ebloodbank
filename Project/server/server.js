import {app} from "./src/app.js"
import connectDb from "./utils/db.js"

import dotenv from "dotenv"
dotenv.config()

const port=process.env.PORT


app.listen(port,async()=>{
    console.log(`Server running at port  ${port}`);
    await connectDb();
})
