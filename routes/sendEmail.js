const express = require('express'),
      router = express.Router(),
      nodemailer = require('nodemailer')
      


// create email endpoint for sending email through NodeMailer
router.post('/email', function (req, res) {

    // create variable to hold email and SMTP options
    let emailOptions, smtpSend

    // SMTP options
    smtpSend = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'greenwald.j8@gmail.com',
            pass: process.env.PASS
        }
    });

    // email options
    emailOptions = {
        from: req.body.senderName + ' &lt;' + req.body.senderEmail + '&gt;',
        to: 'greenwald.j8@gmail.com',
        subject: 'Contact form message from portfolio site',
        text: `${req.body.senderName} (${req.body.senderEmail}) says: ${req.body.senderMessage}`
    };

    // send that email!
    smtpSend.sendMail(emailOptions, function (error, response) {

        // handle errors
        if (error) {
            res.json(error);
        }

        // OR return response
        else {
            res.json(response);
        }
    });
    // send that email!!
    // res.json(testObject)
})



module.exports = router
