import CartPage from "./shopify-payment/cart-page";
import ImsPayment from "./ims-payment/ims-payment";
import ProductItem from "./item-component/product-item";
import AddressComponent from "./address-component/address-component";

import { useMemo } from "react";
import { useCart } from "../../../context/cart/CartContext";
import { SHOP_TYPES } from "../../../constant/shop-types";
import { Box } from "@chakra-ui/react";
import {
  PaymentPageWrapper,
  ProductWrapper,
  TotalPrice,
  TotalPayment,
} from "./payment-page-style";
import { getItemsPrice , getShippingPrice} from "./payment-utils"

const PaymentPage = () => {
  const { cart } = useCart();

  const selectedAddress = JSON.parse(localStorage.getItem("selected_address"));
  let itemsPrice = useMemo(() => getItemsPrice(cart), [cart]);
  let shippingPrice = useMemo(() => getShippingPrice(cart), [cart]);


  const getTotalPrice = () => {
    return (parseFloat(itemsPrice) + parseFloat(shippingPrice)).toFixed(2);
  };

  return (
    <PaymentPageWrapper>
      {cart && (
        <>
          <ProductWrapper>
            {cart.items.map((item, i) => {
              return <ProductItem key={i} type={cart.type} product={item} />;
            })}
            <TotalPrice>Total price: ${itemsPrice}</TotalPrice>
          </ProductWrapper>

          <AddressComponent
            shippingPrice={parseFloat(shippingPrice).toFixed(2)}
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
