const axios = require("axios");
const { formatResponse } = require("../utils/format");

async function makeSearch(searchTerm, page) {
  console.log("testing");
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
