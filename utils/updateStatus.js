const update_Notification_And_DeliveryStatus = async(flag, notificationId, deliveryStatusId)=>{
if (flag === true){
    await prisma.notification.update({
        where: {
          id: notificationId // The ID of the notification to update
        },
        data: {
          status: "SENT", // Update the notification's status
          deliveryStatus: {
            update: {
              where: {
                id: deliveryStatusId // The ID of the specific delivery status to update
              },
              data: {
                status: "SENT",
                errorMessage: null,
                timestamp: new Date()
              }
            }
          }
        }
    });
   return true 
}
return false;
}

export default update_Notification_And_DeliveryStatus;