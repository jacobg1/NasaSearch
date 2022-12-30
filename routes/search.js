const express = require("express"),
  router = express.Router(),
  axios = require("axios");

const url = "https://images-api.nasa.gov/search";

router.get("/search/:query/:description?", function (req, res) {
  const dataArray = [];

  function uniq(a, param) {
    return a.filter(function (item, pos, array) {
      return (
        array
          .map(function (mapItem) {
            return mapItem[param];
          })
          .indexOf(item[param]) === pos
      );
    });
  }

  axios
    .get(url, {
      params: {
        q: req.params.query,
        description: req.params.description,
        media_type: "image",
      },
    })
    .then(function (response) {
      response.data.collection.items.forEach((element) => {
        const combinedArrays = element.links.concat(element.data);

        const mergedObjects = { ...combinedArrays[0], ...combinedArrays[1] };

        dataArray.push(mergedObjects);
      });

      // some of the keyword arrays are a single string separated by , or ;
      // let's turn these into an array and merge it back into the keywords array
      dataArray.forEach((element) => {
        if (element.keywords && element.keywords[0].indexOf(";") > -1) {
          element.keywords[0] = element.keywords[0].split(";");
          element.keywords = [].concat.apply([], element.keywords[0]);
        }

        // do the same for keywords that are separated by ,
        else if (element.keywords && element.keywords[0].indexOf(",") > -1) {
          element.keywords[0] = element.keywords[0].split(",");
          element.keywords = [].concat.apply([], element.keywords[0]);
        }

        if (element.keywords) {
          element.keywords.forEach(function (keyword, index) {
            if (index !== element.keywords.length - 1) {
              element.keywords[index] = keyword + ", ";
            }
          });
          element.keywords = element.keywords.join("").toLowerCase();
        }
      });
      res.json(uniq(dataArray, "title"));
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
