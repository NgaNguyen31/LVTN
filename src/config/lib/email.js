module.exports = app => {
    if (app.email) {
        const nodemailer = require('nodemailer');

        // Send email
        app.email.sendEmail = (mailTo, mailCc, mailSubject, mailText, mailHtml, mailAttachments, successCallback, errorCallback) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: app.email.from,
                    pass: app.email.password
                },
                debug: true
            });
            transporter.on('log', console.log);

            let mailOptions = {
                from: app.email.from,
                cc: mailCc.toString(),
                to: mailTo,
                subject: mailSubject,
                text: mailText,
                html: mailHtml,
                attachments: mailAttachments
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    if (errorCallback) errorCallback(error);
                } else {
                    console.log('Send mail to ' + mailTo + ' successful.');
                    if (successCallback) successCallback();
                }
            });
        };

        // Validate email
        app.email.validateEmail = email => {
            const atpos = email.indexOf('@'), dotpos = email.lastIndexOf('.');
            return (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length);
        };
    } else {
        console.error('No email configuration in package.json!');
    }
};