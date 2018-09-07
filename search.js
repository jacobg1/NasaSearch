const express = require('express'),
      app = express(),
      axios = require('axios');

var port = 3001;

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/search/:query', function (req, res) {
    res.send(req.params);
})

app.listen(port, () => console.log(`listening on port ${port} with ${axios}! :):)`));
