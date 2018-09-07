const express = require('express'),
      app = express(), 
      config = require('config');

var search = require('./routes/search'),
    port = config.get('nasaSearch.setPort.port');

app.use(search);


app.listen(port, () => console.log(`listening on port ${port}! :):)`));
