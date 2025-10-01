const { createPageConfig, getMockResponse } = require("./utils/mockData");

function createMockHandlers() {
  const { http, HttpResponse } = require("msw");

  const pageConfig = createPageConfig();

  const handlers = [
    http.get(process.env.API_URL, ({ request }) => {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");

      return HttpResponse.json(
        getMockResponse({
          page: page || 1,
          pageConfig,
        })
      );
    }),
  ];
  return handlers;
}

module.exports = { createMockHandlers };
