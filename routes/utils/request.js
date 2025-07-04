const axios = require("axios");
const { formatResponse } = require("../utils/format");
const API_URL = "https://images-api.nasa.gov/search";

async function makeSearch(searchTerm, page) {
  const response = await axios.get(API_URL, {
    params: {
      q: searchTerm,
      media_type: "image",
      ...(page && { page }),
    },
  });

  return formatResponse(response.data);
}

module.exports = { makeSearch };
