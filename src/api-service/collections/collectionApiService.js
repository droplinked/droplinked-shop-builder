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

  
export const getCollections = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection`,
    token: token,
  };
  return { ...apiObj };
};

export const getCollectionsWithProduct= () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/collection?withProducts=true`,
    token: token,
  };
  return { ...apiObj };
};



