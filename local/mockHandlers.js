function createPageConfig() {
  const mockResponse = require("./mocks/mockResponse");
  const mockResponsePageTwo = require("./mocks/mockResponsePageTwo");

  const pageConfig = {
    1: mockResponse,
    2: mockResponsePageTwo,
  };

  return { pageConfig, defaultResponse: mockResponse };
}

function getMockResponse({ page, pageConfig, defaultResponse }) {
  return pageConfig[page] ?? defaultResponse;
}

function createMockHandlers() {
  const { http, HttpResponse } = require("msw");

  const { pageConfig, defaultResponse } = createPageConfig();

  const handlers = [
    http.get(process.env.API_URL, ({ request }) => {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");

      return HttpResponse.json(
        getMockResponse({
          page,
          pageConfig,
          defaultResponse,
        })
      );
    }),
  ];
  return handlers;
}

module.exports = { createMockHandlers };
