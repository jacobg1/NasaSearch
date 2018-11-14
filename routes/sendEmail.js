const express = require('express'),
      router = express.Router()


// create email endpoint for sending email through Amazon SES
router.get('/email/:senderEmail/:senderName/:senderMessage', function (req, res) {

    // a test object to hold data from params
    let testObject = {
        name: req.params.senderName,
        email: req.params.senderEmail,
        message: req.params.senderMessage

    }

    // send that email!!
    res.json(testObject)
})



module.exports = router