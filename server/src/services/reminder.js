const models = require("../models");
const config = require('../config/config');
const {
    sendSms
} = require("./sms");

module.exports = () => {



    const checkAndSendReminder = async () => {
        const takenLoans = await models.User_Loans.findAll();
        takenLoans.forEach(async (takenLoan) => {
            const reminders = await takenLoan.getReminders({
                order: [
                    ["createdAt", "DESC"],
                ]
            });
            const blastSms = async () => {
                const thatLoan = await models.Loan.findOne({
                    where: {
                        id: takenLoan.LoanId
                    }
                });
                const thatUser = await models.User.findOne({
                    where: {
                        id: takenLoan.UserId
                    }
                });

                const smsMsgContent = `Hey, pay up bro! For your ${thatLoan.name} which is worth RM${thatLoan.amount}!!!!!`;
                sendSms(thatUser.phone_number, smsMsgContent)
                    .then((smsResponse) => {
                        takenLoan.createReminder({
                            messageSid: smsResponse.sid,
                            message: smsResponse.body,
                        });
                    }).catch((smsErr) => {
                        console.error(smsErr);
                        // TODO
                    });
            };

            if (reminders.length === 0 &&
                (new Date().getTime() - new Date(takenLoan.updatedAt).getTime() > (30 * 86400 * 1000)) &&
                takenLoan.approval === "pending") blastSms();
            else if (
                reminders.length > 0 &&
                new Date().getTime() -
                new Date(reminders[0].createdAt).getTime() >
                (30 * 86400 * 1000)
            ) {
                blastSms();
            }
        });
        // console.log(takenLoans);
    };

    setInterval(checkAndSendReminder, config.production ? 86400000 : 300000);
}