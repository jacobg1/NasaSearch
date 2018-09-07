const express = require('express'),
      app = express(),
      axios = require('axios');

var port = 3001;
var url = 'https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image',
    url2 = 'https://images-api.nasa.gov/search';
app.get('/', function (req, res) {


    axios.get(url)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
})

app.get('/search/:query/:description', function (req, res) {
    console.log(req.params.description);
    axios.get(url2, {
        params: {
            q: req.params.query,
            description: req.params.description,
            media_type: 'image'
        }
    })
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
})

app.listen(port, () => console.log(`listening on port ${port}! :):)`));
