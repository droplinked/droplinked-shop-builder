export const postCreateCollection = (body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const getUsersCollections = () => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection`,
    token: token,
  };
  return { ...apiObj };
};

export const getCollectionById = (collectionId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection/${collectionId}`,
    token: token,
  };
  return { ...apiObj };
};

export const putUpdateCollection = (collectionId: number, body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection/${collectionId}`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const deleteCollection = (collectionId: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection/${collectionId}`,
    token: token,
  };
  return { ...apiObj };
};

export const postAddProductToCollection = (collectionId: number, body: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  let apiObj = {
    url: `collection/${collectionId}`,
    body: body,
    token: token,
  };
  return { ...apiObj };
};

export const getCollectionPublicById = (collectionId: number) => {
  let apiObj = {
    url: `collection/public/collection/${collectionId}`,
  };
  return { ...apiObj };
};

export const getCollectionPublicByShopname = (shopName: string) => {
  let apiObj = {
    url: `collection/public/${shopName}`,
  };
  return { ...apiObj };
};
