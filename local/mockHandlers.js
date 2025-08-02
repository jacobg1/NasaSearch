const { http, HttpResponse } = require("msw");

const mockResponse = require("./mocks/mockResponse");
const mockResponsePageTwo = require("./mocks/mockResponsePageTwo");

const pageConfig = {
  1: mockResponse,
  2: mockResponsePageTwo,
};

function createMockHandlers() {
  const handlers = [
    http.get(process.env.API_URL, ({ request }) => {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");
      return HttpResponse.json(pageConfig[page] ?? mockResponse);
    }),
  ];
  return handlers;
}

module.exports = { createMockHandlers };
