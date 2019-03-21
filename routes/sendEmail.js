const express = require('express'),
      router = express.Router()

// create email endpoint for sending email through NodeMailer
router.post('/email', function (req, res) {

    // send email with sendgrid's api
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'greenwald.j8@gmail.com',
      from: req.body.senderEmail,
      subject: 'Contact from portfolio site',
      text: `${req.body.senderName} (${req.body.senderEmail}) says: ${req.body.senderMessage}`,
      html: `<h1>${req.body.senderName}, (${req.body.senderEmail}) says:</h1><p>${req.body.senderMessage}</p>`,
    }

    sgMail.send(msg, function(error, response) {
        // handle errors
        if (error) {
            res.json(error);
        }

        // OR return response
        else {
            res.json(response);
        }
    });
})



module.exports = router
