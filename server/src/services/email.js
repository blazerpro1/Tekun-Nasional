const nodemailer = require('nodemailer')
const {
    google
} = require('googleapis')

// These id's and secrets should come from .env file.
const CLIENT_ID = '156142240914-gmejk58a9ur3er51peh4tlg5cgohg8ur.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04t6aRHOAqlEHCgYIARAAGAQSNwF-L9IrdognD2DkmcKbuOU5DzpefXogAOSJbq5FjLdV8iaNjew0G7TyqlcLMrjv6k7KQL6XuSc';

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
                from: 'Mak kau ijau <tekuntesting123@gmail.com>',
                to: email,
                subject: 'TEKUN NASIONAL',
                text: messageBody,
                html: `<h1>${messageBody}</h1>`,
            };

            const result = await transport.sendMail(mailOptions);
            

            return result;
        } catch (error) {
            return error;
        }

    }
}