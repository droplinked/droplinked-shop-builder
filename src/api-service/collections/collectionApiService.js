export const getCollectionById = (collectionId) => {
  let apiObj = {
    url: `collection/${collectionId}`,
  };
  return { ...apiObj };
};

export const getCollectionsByShopname = (shopname) => {
  let apiObj = {
    url: `collection/public/${shopname}`,
  };
  return { ...apiObj };
};

export const getCollections = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection`,
    token: token,
  };
  return { ...apiObj };
};

export const getCollectionsWithProduct = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `collection?withProducts=true`,
    token: token,
  };
  return { ...apiObj };
};

export const updateCollection = (collectionId, collectionName) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection/${collectionId}`,
    body: {
      title: collectionName,
    },
    token: token,
  };
  return { ...apiObj };
};

export const addCollection = (collectionName) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection`,
    body: {
      title: collectionName,
    },
    token: token,
  };
  return { ...apiObj };
};

export const deleteCollection = (collectionId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection/${collectionId}`,
    token: token,
  };
  return { ...apiObj };
};

export const addProductToCollection = (collectionId, productId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection/${collectionId}/product`,
    body: { productID: productId },
    token: token,
  };
  return { ...apiObj };
};
