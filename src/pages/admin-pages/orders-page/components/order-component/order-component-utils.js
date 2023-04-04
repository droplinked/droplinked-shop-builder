import { ORDER_TYPES } from "../../../../../constant/order.types";

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
  // if (order.type == SHOP_TYPES.SHOPIFY) {
  //   order.items.forEach((item) => (total += parseFloat(item.price)));
  // } else {
  // total = parseFloat(order.totalPrice);
  order.items.forEach((item) => {
    total += parseFloat(item.totalPriceItem);
  });
  if (order.shippingPrice && order.shippingPrice != "Free")
    total += parseFloat(order.shippingPrice);
  if (order.totalDiscount) total -= parseFloat(order.totalDiscount);
  if (
    order.items[0].product.shippingType &&
    order.items[0].product.shippingType == "CUSTOM"
  ) {
    order.items.forEach((item) => {
      total += parseFloat(item.product.shippingPrice);
    });
  }
  // }

  return parseFloat(total).toFixed(2);
};

const convertToStandardFormat = (currentDate) => {
  let newDate = new Date(currentDate).toString().split(" ");
  newDate = newDate[1] + "/" + newDate[2] + "/" + newDate[3];
  return newDate;
};

export const calculateHowTimePassed = (baseTime) => {
  const now = new Date();
  const yourDate = new Date(baseTime);

  const timePassed = (now.getTime() - yourDate.getTime())-3600000;

  const secondsPassed = Math.floor(timePassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);
  const monthsPassed = Math.floor(daysPassed / 30);

  if (minutesPassed < 1) {
    return "now";
  } else if (hoursPassed < 1) {
    return `${minutesPassed} minutes`;
  } else if (daysPassed < 1) {
    return `${hoursPassed} hours`;
  } else {
    return convertToStandardFormat(yourDate.getTime());
  }
};
