const express = require('express'),
      app = express(), 
      config = require('config')

  var search = require('./routes/search'),
      // set port based on environment
      port = config.get('nasaSearch.setPort.port')

  // CORS middleware
  var allowCrossDomain = function (req, res, next) {

    // Allowing all for now, change in prod
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  }
    // tells app to use the route and middleware that I defined
    app.use(allowCrossDomain)
    app.use(search)

app.listen(port, () => console.log(`listening on port ${port}! :):)`))
