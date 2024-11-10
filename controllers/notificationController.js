import prisma from "../DB_config/config.js";
import replaceTemplateVariables  from "../utils/modifyTemplate.js";
import sendEmail from "../utils/emailModule.js"
import update_Notification_And_DeliveryStatus from "../utils/updateStatus.js";

export const sendNotification = async(req,res,next)=>{
    try {
        const {channel, templateId, variableData} = req.body;
        const {userId} = req.params
        let flag = false

        const userData = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        const userPreferences = await prisma.userPreference.findMany({
            where: { userId },
          });

        const preferredChannels = userPreferences.map(pref => pref.channel);
    if (!preferredChannels.includes(channel)) {
      return res.status(400).json({ message: 'User has opted out of this channel, try with any other channel' });
    }

    let templateData = await prisma.template.findUnique({
        where:{
            id:templateId
        }
    })

    if(!templateData) return res.status(404).json({message:`Template with template id ${templateId} NOT FOUND`})

    const updatedContent = replaceTemplateVariables(templateData.content, variableData);
    templateData.content = updatedContent || templateData.content

    const notification = await prisma.notification.create({
        data: {
          userId,
          templateId,
          channel,
          content: templateData.content,
          status: 'PENDING',
        },
      });


      const deliveryStatus = await prisma.deliveryStatus.create({
        data: {
          notificationId: notification.id,
          status: 'PENDING',
          timestamp: new Date(),
        },
      });


      if (channel==="email"){
        const response = await sendEmail(userData.email, templateData.name, templateData.content);
        if(response.messageId) flag = true;
      }
      if (channel === "sms"){
        const response = await sendSMS(templateData.content,[userData.mobileNo]);
        if(response.return===true && response.request.id) flag = true;
    }

      const updateFlag = update_Notification_And_DeliveryStatus(flag, notification.id, deliveryStatus.id);
      if(!updateFlag) return res.status(400).json({message:"Notification was not sent"});
      return res.status(200).json({message:"Notification sent Successfully"});
    } 
    catch (error) {
        return res.status(400).json({error:"something went wrong", message:error.message});
    }
}


