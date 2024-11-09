import prisma from "../DB_config/config";

export const createTemplate = async(req , res , next) =>{
    try {
       const {name, content} = req.body;
       const newTemplate = await prisma.template.create({
        data:{
            name,
            content
        }
       });
       
       if(!newTemplate) return res.status(400).json({msg:"Template was not created"});

       return res.status(201).json({msg:"New Template Created Successfully", template:newTemplate});
    } catch (error) {
      return res.status(500).json({error});  
    }
}

export const updateTemplate = async(req,res,next)=>{
    try {
        const {templateId} = req.params;
        const {name, content} = req.body;

        const updatedTemplate = await prisma.template.update({
            where:{
                id:templateId
            },
            data:{
                name,
                content
            }
        })

       return res.status(201).json({msg:"Template Updated Successfully", template:updatedTemplate});

    } catch (error) {
        return res.status(500).json({error});  
    }
}

export const deleteTemplate = async(req,res)=>{
    try {
        const {templateId} = req.params;

        const deleteTemplateData = await prisma.template.delete({
            where:{
                id:templateId
            }
        });

        return res.status(201).json({msg:"Template Deleted Successfully", data:deleteTemplateData});
        
    } catch (error) {
        return res.status(500).json({error:error.message});  
 
    }
}
export const getTemplateById = async(req , res , next)=>{
    try {
        const {templateId} = req.params;

        const templateData = await prisma.template.findUnique({
            where:{
                id:templateId
            }
        });
        if(!templateData) return res.status(404).json({msg:"Template Not Found"});

        return res.status(200).json({msg: "Template Found", data: templateData})
    } catch (error) {
        return res.status(500).json({error});  
    }
}

export const getAllTemplates = async(req ,res, next)=>{
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 

        const skip = (page - 1) * limit;

        const allTemplatesData = await prisma.template.findMany({
            skip: skip,
            take: limit
        });

        if (allTemplatesData.length === 0) {
            return res.status(404).json({ msg: "Templates Not Found" });
        }

        return res.status(200).json({
            msg: "All Templates",
            data: allTemplatesData,
            pagination: {
                page: page,
                limit: limit
            }
        });
    } catch (error) {
        return res.status(500).json({error});   
    }
}