const express = require('express'),
      router = express.Router(),
      axios = require('axios')

var url = 'https://images-api.nasa.gov/search'

// create search endpoint
router.get('/search/:query/:description?', function (req, res) {

    // create empty array to push in restructured data
    var dataArray = []

    // removes duplicate items from array based on object key
    // first argument is the array to check, second argument 
    // is the object key to compare
    function uniq(a, param) {
        return a.filter(function (item, pos, array) {
            return array.map(function (mapItem) {
                return mapItem[param];
            }).indexOf(item[param]) === pos;
        })
    }

    // make GET request with params that will come from user input
    axios.get(url, {
        params: {
            q: req.params.query,
            description: req.params.description,
            media_type: 'image' //TODO: video search
        }
    })
      .then(function (response) {

        // begin restructure of data, this will make data easier to manipulate in front end
        // loop through response
        response.data.collection.items.forEach(element => {

          // combine top level arrays, one holds the image link, the other holds the rest of the data
          var combinedArrays = element.links.concat(element.data)

          // each item now contains two objects, merge these two objects into a single object
          var mergedObjects = {...combinedArrays[0], ...combinedArrays[1]}

            // push each object into main array, this will be sent to front end
            dataArray.push(mergedObjects)
        })
       
        // send the data, which is now an array of objects, each object is a single item
        // call uniq function to remove items that have the same title
        res.json(uniq(dataArray, 'title'))

      })
      .catch(function (error) {

        // handle error, with any luck there won't be any :)
        console.log(error)

      });

})

module.exports = router