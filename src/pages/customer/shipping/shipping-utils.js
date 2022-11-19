import { SHOP_TYPES } from "../../../constant/shop-types";

export const getTotalPrice = (cart ,selectedShipping) => {
    if (cart == null) return 0;
    let total = 0;
    // calculate for shopify products
    if (cart.type == SHOP_TYPES.SHOPIFY) {
      cart.items.forEach(
        (item) => (total += parseFloat(item.variant.price) * item.amount)
      );
    } else {
      // calculate for ims products
      cart.items.forEach(
        (item) => (total += parseFloat(item.sku.price) * item.quantity)
      );
    }
    total += parseFloat(getShippingPrice(cart ,selectedShipping));
    return total.toFixed(2);
  };


  export const getShippingPrice = (cart ,selectedShipping) => {
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      return selectedShipping.rate;
    } else {
      return selectedShipping.price;
    }
  };