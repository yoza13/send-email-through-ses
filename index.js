var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });
exports.handler = async (event, context, callback) => {
  const { subject, body, from } = event;
  const emailParams = {
    Destination: {
      ToAddresses: ["yashmichael@gmail.com"],
    },
    ReplyToAddresses: [from],
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: "yashmichael@gmail.com",
  };
  try {
    const responseData = await ses.sendEmail(emailParams).promise();
    return {
      message: "MAIL SENT SUCCESSFULLY!!",
      responseData,
    };
  } catch (e) {
    return {
      message: "FAILURE IN SENDING MAIL!!",
      e,
    };
  }
};
