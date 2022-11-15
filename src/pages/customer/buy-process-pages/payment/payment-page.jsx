import CartPage from "./shopify-payment/cart-page";
import ImsPayment from "./ims-payment/Payment-page";
import ProductItem from "./item-component/product-item";
import AddressComponent from "./address-component/address-component";

import { useCart } from "../../../../context/cart/CartContext";
import { SHOP_TYPES } from "../../../../constant/shop-types";
import { Box } from "@chakra-ui/react";

import {
  PaymentPageWrapper,
  ProductWrapper,
  TotalPrice,
  TotalPayment,
} from "./payment-page-style";

const PaymentPage = () => {
  const { cart } = useCart();
  ///console.log(cart);

  const selectedAddress = JSON.parse(localStorage.getItem("selected_address"));

  const shippingPrice = () => {
    if (cart) {
      return cart.type == SHOP_TYPES.DROPLINKED
        ? cart.items[0].product.shippingType == "CUSTOM"
          ? getCustomShipping()
          : cart.selectedEasyPostShipmentRate
        : JSON.parse(localStorage.getItem("shippingPrice")).shippingPrice;
    }
  };

  const getCustomShipping = () => {
    let totalS = 0;
    cart.items.forEach((item) => {
      totalS += item.product.shippingPrice;
    });
    return totalS 
  };

  const getItemsPrice = () => {
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

  const getTotalPrice = () => {
    return (parseFloat(getItemsPrice()) + parseFloat(shippingPrice())).toFixed(
      2
    );
  };

  return (
    <PaymentPageWrapper>
      {cart && (
        <>
          <ProductWrapper>
            {cart.items.map((item, i) => {
              return <ProductItem key={i} type={cart.type} product={item} />;
            })}
            <TotalPrice>Total price: ${getItemsPrice()}</TotalPrice>
          </ProductWrapper>

          <AddressComponent
            shippingPrice={parseFloat(shippingPrice()).toFixed(2)}
            selectedAddress={selectedAddress}
          />

          <Box w="100%" borderBottom="1px solid #757575" mb="32px"></Box>

          <TotalPayment>Total payment: ${getTotalPrice()}</TotalPayment>
          {cart.type == SHOP_TYPES.DROPLINKED ? <ImsPayment totalPrice={parseFloat(getTotalPrice())}/> : <CartPage />}
        </>
      )}
    </PaymentPageWrapper>
  );
};

export default PaymentPage;
