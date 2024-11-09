import prisma from "../DB_config/config.js";
import templatesData from "../utils/constantData.js";

export const createDummyTemplateData = async(req,res)=>{
    try {
        const templates = await prisma.template.createMany(
            {
                data:templatesData
            }
        ) 
        if(!templates)return res.status(400).json({msg:"Something went wrong, data not created"});

        return res.status(201).json({msg:"Dummy templates have been created", templates:templates})
    } catch (error) {
        return res.status(400).json({error});
    } 
}

export const createUser = async(req,res)=>{
    try {
       const {name,email,mobileNo} = req.body;

       const newUser = await prisma.user.create({
        data:{
            name,
            email,
            mobileNo
        }
       })

       if(!newUser)return res.status(400).json({msg: "something went wrong"});

       return res.status(201).json({msg:"User created successfully", userData: newUser});
    } catch (error) {
        return res.status(400).json({error}); 
    }
}

