// import { SHOP_TYPES } from "../../../constant/shop-types";

// export const getTotalPrice = (cart) => {
//     if (cart == null) return 0;
//     let total = 0;
//     // calculate for shopify products
//     if (cart.type == SHOP_TYPES.SHOPIFY) {
//       cart.items.forEach(
//         (item) => (total += parseFloat(item.variant.price) * item.amount)
//       );
//     } else {
//       // calculate for ims products
//       cart.items.forEach(
//         (item) => (total += parseFloat(item.sku.price) * item.quantity)
//       );
//     }
//     return total.toFixed(2);
//   };