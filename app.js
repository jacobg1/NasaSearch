const express = require('express'),
      app = express();

var search = require('./routes/search');
var port = 3001;

app.use(search);


app.listen(port, () => console.log(`listening on port ${port}! :):)`));
