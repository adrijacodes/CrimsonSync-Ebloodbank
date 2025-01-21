import {app} from "./src/app.js"
import connectDb from "./src/utils/db.js"

import dotenv from "dotenv"
dotenv.config()

const port=process.env.PORT

app.on("error", (error) => {
    console.error("App encountered an error:", error);
  });
  
app.listen(port,async()=>{
    console.log(`Server running at port  ${port}`);
    await connectDb();
})
