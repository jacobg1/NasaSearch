function getRandomNumber(numMockImages) {
  return Math.floor(Math.random() * numMockImages) + 1;
}

function createMockImageHref(imageSize) {
  const localImageFolder = process.env.LOCAL_IMAGE_FOLDER;
  const localApiUrl = `http://localhost:${process.env.PORT}`;

  const randomNumber = getRandomNumber(3);

  return `${localApiUrl}/${localImageFolder}/${imageSize}/${randomNumber}.jpg`;
}

function formatMockImage(items) {
  const imageSize = process.env.IMAGE_SIZE;

  return items.map(({ links, ...rest }) => ({
    ...rest,
    links: links.map((link) => {
      if (link.href.includes(imageSize)) {
        return {
          ...link,
          href: createMockImageHref(imageSize),
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
