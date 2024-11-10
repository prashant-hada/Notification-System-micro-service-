import fast2sms from "fast-two-sms"

const sendSMS = async(message, numberList)=>{
    var options = {authorization : process.env.SMS_API_KEY , message : 'Hey Guys welcome backe to my channel' ,  numbers : numberList} 
    const response = await fast2sms.sendMessage(options);
    return response;
}

export default sendSMS;