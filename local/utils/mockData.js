const { URL } = require("url");
const { addMockImages } = require("./mockImages");

function createPageConfig() {
  const mockResponse = require("../mocks/mockResponse");
  const mockResponsePageTwo = require("../mocks/mockResponsePageTwo");

  const pageConfig = {
    1: addMockImages(mockResponse),
    2: addMockImages(mockResponsePageTwo),
  };

  return pageConfig;
}

function createPaginationLinks(pageData, pageNumber) {
  const {
    collection: { links, ...rest },
  } = pageData;

  return {
    collection: {
      ...rest,
      links: links.map((link) => {
        const newPage = link.rel === "prev" ? pageNumber - 1 : pageNumber + 1;
        const url = new URL(link.href);
        url.searchParams.set("page", newPage);

        return {
          ...link,
          href: url.toString(),
        };
      }),
    },
  };
}

function getMockResponse({ page, pageConfig }) {
  const secondPage = 2;
  const pageNumber = parseInt(page, 10);

  if (pageNumber > secondPage) {
    return createPaginationLinks(pageConfig[secondPage], pageNumber);
  }

  return pageConfig[page];
}

module.exports = { createPageConfig, getMockResponse };
