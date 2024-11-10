import templatesData from "./constantData.js";
import sendEmail from "./emailModule.js";
import {notificationQueue, redisConnection} from "./jobQueue.js";
import replaceTemplateVariables from "./modifyTemplate.js";
import sendSMS from "./smsModule.js";
import update_Notification_And_DeliveryStatus from "./updateStatus.js"

export {
    templatesData,
    sendEmail,
    notificationQueue,
    redisConnection,
    replaceTemplateVariables,
    sendSMS,
    update_Notification_And_DeliveryStatus
}