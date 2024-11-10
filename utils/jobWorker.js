import prisma from "../DB_config/config.js";
import { Worker } from "bullmq";
import { sendSMS, sendEmail, redisConnection, update_Notification_And_DeliveryStatus} from "./index.js";

const notificationWorker = new Worker(
  "notifications",
  async (job) => {
    try {
      const { notificationId, deliveryStatusId } = job.data;
      let flag = false;

      const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
        include: { user: true, template: true },
      });

      if (!notification || notification.status !== "PENDING") {
        console.log(
          `Notification with ID ${notificationId} not found or not pending`
        );
        return;
      }

      if (notification.channel === "email") {
        const response = await sendEmail(
          notification.user.email,
          notification.template?.name || "Notification",
          notification.content
        );
        if (response.messageId) flag = true;
      } else if (notification.channel === "sms") {
        const response = await sendSMS(notification.content, [
          notification?.user?.mobileNo,
        ]);
        if (response.return === true && response.request.id) flag = true;
      }
      update_Notification_And_DeliveryStatus(flag, notificationId, deliveryStatusId);
      
    } catch (error) {
      console.error(
        `Failed to send notification with ID ${notificationId}:`,
        error
      );
      await prisma.deliveryStatus.create({
        data: {
          notificationId: notificationId,
          status: "FAILED",
          errorMessage: error.message,
          timestamp: new Date(),
        },
      });
    }
  },
  { connection: redisConnection }
);

notificationWorker.on("failed", (job, err) => {
  console.error(
    `Job failed for notification ID ${job.data.notificationId}:`,
    err
  );
});

export default notificationWorker;
