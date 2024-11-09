import express from "express"
import "dotenv/config"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3001

app.get("/",(req,res,next)=>{
    res.send("Hi from server")
})

app.listen(PORT,()=>{
    console.log(`Service is running on PORT ${PORT}`)
})

