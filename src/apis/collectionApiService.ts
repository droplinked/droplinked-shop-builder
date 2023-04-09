import { createApiReq } from "./api-utils";

export const postCreateCollection = (collectionName: string) => {
  return createApiReq(`collection`, true, { title: collectionName });
};

export const getUsersCollections = () => {
  return createApiReq(`collection`, true, null);
};

export const getCollectionById = (collectionId: number) => {
  return createApiReq(`collection/${collectionId}`, true, null);
};

export const putUpdateCollection = (
  collectionId: number,
  collectionName: string
) => {
  return createApiReq(`collection/${collectionId}`, true, {
    title: collectionName,
  });
};

export const deleteCollection = (collectionId: number) => {
  return createApiReq(`collection/${collectionId}`, true, null);
};

export const postAddProductToCollection = (collectionId: number, body: any) => {
  return createApiReq(`collection/${collectionId}`, true, body);
};

export const getCollectionPublicById = (collectionId: number) => {
  return createApiReq(
    `collection/public/collection/${collectionId}`,
    false,
    null
  );
};

export const getCollectionPublicByShopName = (shopName: string) => {
  return createApiReq(`collection/public/${shopName}`, false, null);
};
