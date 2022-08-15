
import { ORDER_TYPES } from "../../constant/order.types";

export const mergeWaitingOrders = (orders) => {
  let newArray = [];
  let waitingOrders = orders.filter(
    (order) => order.status == ORDER_TYPES.WAITING_FOR_PAYMENT
  );
  let otherOrders = orders.filter(
    (order) => order.status != ORDER_TYPES.WAITING_FOR_PAYMENT
  );

  waitingOrders.forEach((order, i) => {
    let test = waitingOrders.filter((or) => or.cartID == order.cartID);
    if (test.length > 1) {
      if (!newArray.find((dupliOrder) => dupliOrder.cartID == order.cartID)) {
        waitingOrders.forEach((currentOrder) => {
          if (currentOrder.cartID == order.cartID && currentOrder._id != order._id) {
            order.items = currentOrder.items.concat(order.items);
            order.totalPrice = currentOrder.totalPrice + order.totalPrice;
          }
        });
        newArray.push(order);
      }
    } else {
      newArray.push(order);
    }
  });

  newArray = newArray.concat(otherOrders);
  return newArray;

};
