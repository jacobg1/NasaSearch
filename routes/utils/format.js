const uniqBy = require("lodash.uniqby");
const { URL, URLSearchParams } = require("url");

const IMAGE_SIZE = "medium";

function formatKeywords(keywords) {
  if (!keywords?.length) return "";

  if (keywords.length > 1) {
    return keywords.join(", ");
  }

  if (keywords[0].indexOf(";") > -1) {
    return keywords[0].replace(/;/g, ",");
  }

  return keywords[0];
}

function formatPaginationLinks(paginationLinks) {
  if (!paginationLinks?.length) return [];

  return paginationLinks.reduce((acc, curr) => {
    try {
      const url = new URL(curr.href);
      const searchParams = new URLSearchParams(url?.searchParams);
      const page = searchParams?.get("page");
      const searchTerm = searchParams?.get("q");

      if (!page || !searchTerm) return acc;

      return [...acc, { ...curr, page, searchTerm }];
    } catch (err) {
      console.error(err);
      return acc;
    }
  }, []);
}

function formatResponse(responseData) {
  const { items, links: paginationLinks } = responseData.collection;

  const formatItems = items.reduce((acc, { data: dataArray, links: imageLinks }) => {
    const imageUrl = imageLinks?.find(({ href }) => href.includes(IMAGE_SIZE))?.href;
    const data = dataArray?.[0];

    if (!imageUrl || !data) return acc;

    return [
      ...acc,
      {
        ...data,
        href: imageUrl,
        keywords: formatKeywords(data.keywords),
      },
    ];
  }, []);

  return {
    items: uniqBy(formatItems, "title"),
    paginationLinks: formatPaginationLinks(paginationLinks),
  };
}

module.exports = { formatResponse };
