const express = require('express'),
      app = express(), 
      config = require('config'),
      compression = require('compression'),
      helmet = require('helmet');

  var search = require('./routes/search'),
      email = require('./routes/sendEmail')
      // set port based on environment
      port = process.env.PORT || 3000

  // CORS middleware
  var allowCrossDomain = function (req, res, next) {

    // Allowing all for now, change in prod
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  }
    // tells app to use the route and middleware that I defined
    app.use(compression());
    app.use(helmet());
    app.use(allowCrossDomain)
    app.use(search, email)

app.listen(port, () => console.log(`listening on port ${port}! :):)`))
