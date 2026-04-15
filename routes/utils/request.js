const axios = require("axios");
const { formatResponse } = require("../utils/format");

async function makeSearch(searchTerm, page) {
  const response = await axios.get(process.env.API_URL, {
    params: {
      q: searchTerm,
      media_type: "image",
      ...(page && { page }),
    },
  });

  return formatResponse(response.data);
}

module.exports = { makeSearch };
