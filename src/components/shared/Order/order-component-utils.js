import { ORDER_TYPES } from "../../../constant/order.types";
import { SHOP_TYPES } from "../../../constant/shop-types";

export const getStatus = (orderStatus) => {
  switch (orderStatus) {
    case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
      return "Waiting for confirmation";
    case ORDER_TYPES.CANCELED:
      return "Canceled";
    case ORDER_TYPES.SENT:
      return "Sent";
    case ORDER_TYPES.PROCESSING:
      return "Processing";
    case ORDER_TYPES.REFUNDED:
      return "Canceled";
    case ORDER_TYPES.WAITING_FOR_PAYMENT:
      return "Waiting for payment";
    // case ORDER_TYPES.WAITING_FOR_PAYMENT:
    //   return "Waiting for payment";
    default:
      return "";
  }
};

export const getTotalPrice = (order) => {
  let total = 0.0;
  if (order.type == SHOP_TYPES.SHOPIFY) {
    order.items.forEach((item) => (total += parseFloat(item.price)));
  } else {
   // total = parseFloat(order.totalPrice);
    order.items.forEach(item => {
      total += (parseFloat(item.sku.price) * item.quantity);
    })
    if (order.shippingPrice && (order.shippingPrice != "Free")) total += parseFloat(order.shippingPrice);
    if (order.totalDiscount) total -= parseFloat(order.totalDiscount);
    if (
      order.items[0].product.shippingType &&
      order.items[0].product.shippingType == "CUSTOM"
    ) {
      order.items.forEach((item) => {
        total += parseFloat(item.product.shippingPrice);
      });
    }
  }

  return parseFloat(total).toFixed(2);
};
