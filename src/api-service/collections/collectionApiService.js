export const getCollectionById = (collectionId) => {
  let apiObj = {
    url: `collection/${collectionId}`,
  };
  return { ...apiObj };
};

export const getCollectionsByShopname = (shopname) => {
    let apiObj = {
      url: `collections/${shopname}`,
    };
    return { ...apiObj };
  };
  

