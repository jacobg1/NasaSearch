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
                return mapItem[param]
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

            // some of the keyword arrays are a single string separated by , or ;
            // let's turn these into an array and merge it back into the keywords array
            dataArray.forEach(element => {

              // check if item has keywords and if is single string with ; as a separator
              if(element.keywords && element.keywords[0].indexOf(';') > -1) {

                // split the string at ; and flatten
                element.keywords[0] = element.keywords[0].split(';')
                element.keywords = [].concat.apply([],element.keywords[0])

              }

              // do the same for keywords that are separated by ,
              else if (element.keywords && element.keywords[0].indexOf(',') > -1) {

                element.keywords[0] = element.keywords[0].split(',')
                element.keywords = [].concat.apply([], element.keywords[0])

              }

              // only run the following if keywords exist on data to prevent errors
              if(element.keywords) {

                // add comma after all keywords except last in array
                element.keywords.forEach(function(keyword, index) {

                  if(index !== element.keywords.length - 1) {
                      element.keywords[index] = keyword + ', '
                  }

                })

                // join keywords into one string and make lowercase
                element.keywords = element.keywords.join('').toLowerCase()
              }

            });

            // send the data, which is now an array of objects, each object is a single item
            // call uniq function to remove items that have the same title
            res.json(uniq(dataArray, 'title'))

      })
      .catch(function (error) {

        // handle error
        console.log(error)

      });

})

module.exports = router
