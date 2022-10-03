import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate,useParams } from "react-router-dom";
import { useCart } from "../../../context/cart/CartContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import {
  CheckoutPageWrapper,
  EmptyText,
  HeadText,
  PriceWrapper,
  PriceText,
  ButtonWrapper,
} from "./Checkout-page-style";
import { SHOP_TYPES } from "../../../constant/shop-types";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import EmailModal from "../../../components/Modal/Email-modal/email-modal";
import DroplinkedItem from "./chekout-item/Droplinked-item";
import ShopifytItem from "./chekout-item/Shopify-item";

function CheckoutPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { profile } = useProfile();
  const { cart } = useCart();

  let navigate = useNavigate();
  let { shopname } = useParams();

  const closeEmailModal = () => setShowEmailModal(false);

  const getTotalPrice = () => {
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
    return total.toFixed(2);
  };

  const checkoutSubmit = () => {
    if (!profile.email) {
      setShowEmailModal(true);
      return;
    }
    navigate(`/${shopname}/address`);
  };

  const currentShop = JSON.parse(localStorage.getItem("currentShop"));
  const backToShop = () => navigate(`/${currentShop}`);

  return (
    <CheckoutPageWrapper>
      {cart == null ? (
        <EmptyText>Empty</EmptyText>
      ) : (
        <>
          <HeadText>Checkout</HeadText>

          <Box bgColor="#353535" borderRadius="8px">
            {cart.items.map((item, i) => (
              <>
                {cart.type == SHOP_TYPES.SHOPIFY ? (
                  <ShopifytItem
                    product={item.product}
                    variant={item.variant}
                    amount={item.amount}
                  />
                ) : (
                  <DroplinkedItem
                    product={item.product}
                    sku={item.sku}
                    quantity={item.quantity}
                    shopName={item.shopName}
                  />
                )}
                {(i != (cart.items.length-1)) && (
                  <Box w="100%" px="16px">
                    <Box w="100%" borderBottom="2px solid #757575"></Box>
                  </Box>
                )}
              </>
            ))}
          </Box>

          <PriceWrapper>
            <Box>
              <PriceText>Total price: ${getTotalPrice()}</PriceText>
            </Box>
          </PriceWrapper>

          <ButtonWrapper>
            <Box w={{ base: "150px", md: "200px" }} overflow="hidden">
              <BasicButton click={backToShop} cancelType={true}>
                Back to shop
              </BasicButton>
            </Box>

            <Box w={{ base: "150px", md: "200px" }} overflow="hidden">
              <BasicButton click={checkoutSubmit}>Check out</BasicButton>
            </Box>
          </ButtonWrapper>
        </>
      )}
      {showEmailModal && <EmailModal close={closeEmailModal} />}
    </CheckoutPageWrapper>
  );
}

export default CheckoutPage;
