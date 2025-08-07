const IMAGE_SIZE = "medium";
const numMockImages = 3;

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function createMockImageHref() {
  const localApiUrl = `http://localhost:${process.env.PORT}/images`;
  const randomNumber = getRandomNumber(numMockImages);

  return `${localApiUrl}/${IMAGE_SIZE}/${randomNumber}.jpg`;
}

function formatMockImage(items) {
  return items.map(({ links, ...rest }) => ({
    ...rest,
    links: links.map((link) => {
      if (link.href.includes(IMAGE_SIZE)) {
        return {
          ...link,
          href: createMockImageHref(IMAGE_SIZE),
        };
      }
      return link;
    }),
  }));
}

function addMockImages({ collection, ...rest }) {
  const addMockImages = {
    ...rest,
    collection: {
      ...collection,
      items: formatMockImage(collection.items),
    },
  };

  return addMockImages;
}

function shouldStartLocalServer() {
  return process.env.ENV === "local" || process.env.ENV === "mocks";
}

function shouldStartMockServer() {
  return process.env.ENV === "mocks";
}

module.exports = {
  shouldStartLocalServer,
  shouldStartMockServer,
  addMockImages,
};
