require('dotenv').config();
const nodemailer = require('nodemailer')
const {
    google
} = require('googleapis')


// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.EMAIL_CLIENT_ID;
const CLEINT_SECRET = process.env.EMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Azg5Nrek8BmCgYIARAAGAQSNwF-L9Iry5jRD-CtRQdP2nWK1maXQxjKeGAUlBMoGhK1Qy4o8CEURwxl1akcsv_58BeYBPqWaL4';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// async function sendMail() {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();

//         const transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: 'tekuntesting123@gmail.com',
//                 clientId: CLIENT_ID,
//                 clientSecret: CLEINT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken,
//             },
//         });

//         const mailOptions = {
//             from: 'Mak kau ijau <tekuntesting123@gmail.com>',
//             to: 'yougotfoolmike@gmail.com',
//             subject: 'Hello from gmail using API',
//             text: 'Hello from gmail email using API',
//             html: '<h1>Hello from gmail email using API</h1>',
//         };

//         const result = await transport.sendMail(mailOptions);
//         return result;
//     } catch (error) {
//         return error;
//     }
// }



module.exports = {

    sendMail: async (email, messageBody) => {
        console.log(`[Email] ${email}: ${messageBody}`);
        try {
            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'tekuntesting123@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLEINT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });

            const mailOptions = {
                from: 'TEKUN NASIONAL <tekuntesting123@gmail.com>',
                to: email,
                subject: 'TEKUN NASIONAL',
                text: messageBody,
                html: `<div>${messageBody}</div>`,
            };

            const result = await transport.sendMail(mailOptions);
            

            return result;
        } catch (error) {
            return error;
        }

    },

    //WHY DOESN'T THIS WORK? LOL
    // sendResetMail: async (email, messageBody) => {
    //     console.log(`[ResetEmail] ${email}: ${messageBody}`);
    //     try {
    //         const accessToken = await oAuth2Client.getAccessToken();

    //         const transport = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 type: 'OAuth2',
    //                 user: 'tekuntesting123@gmail.com',
    //                 clientId: CLIENT_ID,
    //                 clientSecret: CLEINT_SECRET,
    //                 refreshToken: REFRESH_TOKEN,
    //                 accessToken: accessToken,
    //             },
    //         });

    //         const mailOptions = {
    //             from: 'TEKUN NASIONAL <tekuntesting123@gmail.com>',
    //             to: email,
    //             subject: 'TEKUN NASIONAL',
    //             text: messageBody,
    //             html: `<h1>${messageBody}</h1>`,
    //         };
    //         console.log("cibai")
    //         const result = await transport.sendMail(mailOptions);
    //         console.log("cibai2")
            

    //         return result;
    //     } catch (error) {
    //         return error;
    //     }

    // },

}
