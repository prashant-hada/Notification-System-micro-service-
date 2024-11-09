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

app.listen(PORT,()=>{
    console.log(`Service is running on PORT ${PORT}`)
})

