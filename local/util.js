function createMockImageHref(items) {
  const imageSize = process.env.IMAGE_SIZE;
  const localImageFolder = process.env.LOCAL_IMAGE_FOLDER;
  const localApiUrl = `http://localhost:${process.env.PORT}`;

  return items.map(({ links, ...rest }) => ({
    ...rest,
    links: links.map((link) => {
      if (link.href.includes(imageSize)) {
        return {
          ...link,
          href: `${localApiUrl}/${localImageFolder}/${imageSize}/1.jpg`,
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
      items: createMockImageHref(collection.items),
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
