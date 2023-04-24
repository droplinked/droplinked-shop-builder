import { SHOP_TYPES } from "../../constant/shop-types";

export const getProductImage = (product) =>
  product.type == SHOP_TYPES.DROPLINKED
    ? product.media[0].url
    : product.shopifyData.images.length > 0
    ? product.shopifyData.images[0].src
    : "";

export const getProductTitle = (product) =>
  product.type == SHOP_TYPES.DROPLINKED
    ? product.title
    : product.shopifyData.title;

export const getProductColors = (product) => {
  if (product.type == SHOP_TYPES.SHOPIFY) {
    let findOption = product.shopifyData.options.find(
      (option) => option.name == "Color"
    );
    return findOption ? findOption.values : null;
  } else {
    return null;
  }
};
