import express from "express";
import "dotenv/config";
import cors from "cors";
import AppRouter from "./routes/index.js"
import sendEmail from "./utils/emailModule.js";


const app = express();
const PORT = process.env.PORT || 3001


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/",AppRouter);
app.get("/email-send",async(req,res,next)=>{
    try {
        const {
            to="hadaprashant2002@gmail.com", 
            subject="Test mail Hihi hoohoo", 
            message = "He he my boiii how's it goin baby, la la la"
        }=req.query;

        const info = await sendEmail(to,subject,message);

        return res.status(200).json({message:"API to chali hai Boss", info});
    } catch (error) {
       return res.status(400).json({message:"some error occured", error}) 
    }


app.listen(PORT,()=>{
    console.log(`Service is running on PORT ${PORT}`)
})

