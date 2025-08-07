const { addMockImages } = require("./util");

function createPageConfig() {
  const mockResponse = require("./mocks/mockResponse");
  const mockResponsePageTwo = require("./mocks/mockResponsePageTwo");

  const pageConfig = {
    1: addMockImages(mockResponse),
    2: addMockImages(mockResponsePageTwo),
  };

  return pageConfig;
}

function getMockResponse({ page, pageConfig }) {
  // TODO - dynamic pages mocks?
  const defaultPage = 1;
  return pageConfig[page] ?? pageConfig[defaultPage];
}

function createMockHandlers() {
  const { http, HttpResponse } = require("msw");

  const pageConfig = createPageConfig();

  const handlers = [
    http.get(process.env.API_URL, ({ request }) => {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");

      return HttpResponse.json(getMockResponse({ page, pageConfig }));
    }),
  ];
  return handlers;
}

module.exports = { createMockHandlers };
