const { http, HttpResponse } = require("msw");

const mockResponse = require("./mocks/mockResponse");
const mockResponsePageTwo = require("./mocks/mockResponsePageTwo");

const API_URL = "https://images-api.nasa.gov/search";

const pageConfig = {
  1: mockResponse,
  2: mockResponsePageTwo,
};

function createMockHandlers() {
  const handlers = [
    http.get(API_URL, ({ request }) => {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");
      return HttpResponse.json(pageConfig[page]);
    }),
  ];
  return handlers;
}

module.exports = { createMockHandlers };
