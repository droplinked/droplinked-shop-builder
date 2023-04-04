import { SHOP_TYPES } from "../../../constant/shop-types";

export const getItemsPrice = (cart) => {
    let totalPrice = 0;
    if (cart.type == SHOP_TYPES.DROPLINKED) {
      cart.items.forEach(
        (item) => (totalPrice += item.quantity * parseFloat(item.sku.price))
      );
    } else {
      cart.items.forEach((item) => {
        totalPrice += item.amount * parseFloat(item.variant.price);
      });
    }
    return totalPrice.toFixed(2);
  };


  const getCustomShipping = (cart) => {
    let totalS = 0;
    cart.items.forEach((item) => {
      totalS += item.product.shippingPrice;
    });
    return totalS 
  };


  export const getShippingPrice = (cart) => {
    if (cart) {
      return cart.type == SHOP_TYPES.DROPLINKED
        ? cart.items[0].product.shippingType == "CUSTOM"
          ? getCustomShipping(cart)
          : cart.selectedEasyPostShipmentRate
        : JSON.parse(localStorage.getItem("shippingPrice")).shippingPrice;
    }
  };