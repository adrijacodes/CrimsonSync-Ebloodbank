import express from "express"
import morgan from "morgan"
const app=express()

app.use(morgan('dev'))
// app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); 
// app.use(methodOverride('_method'));


app.get('/',(req,res)=>{
    res.send("Hello WORLD")
})




export {app}