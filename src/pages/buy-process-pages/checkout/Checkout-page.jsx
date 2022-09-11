import { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
import CheckoutShopItem from "./CheckoutShopItem";
import Loading from "../../../components/shared/loading/Loading";
import ShopifyCheckoutItem from "./Shopify-checkout-item";
import EmailModal from "../../../components/Modal/Email-modal/email-modal";

function CheckoutPage() {
  const [cartBaseShop, setCart] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { profile } = useProfile();
  const { cart } = useCart();
  let navigate = useNavigate();

  // get shops of items
  // const getshops = () => {
  // 	// get all shops in cart
  // 	let shopArray = cart.items.map(item => item.shopName)
  // 	// make unique array for shops
  // 	let shops = [...new Set(shopArray)];
  // 	return shops
  // }

  const closeEmailModal = () => setShowEmailModal(false);

  const getTotalPrice = () => {
    let total = 0;
    cart.items.forEach(
      (item) => (total += parseFloat(item.variant.price) * item.amount)
    );
    return total;
  };

  //get total price of all items
  // const getTotalPrice = () => {
  // 	// get total of each shop + 5 (shipping)
  // 	let total = cartBaseShop.map(shop => { return (parseFloat(shop.total) + 5) })
  // 	total = total.reduce((a, b) => a + b, 0)
  // 	return total
  // }

  // build new cart based shop name
  // useEffect(() => {
  // 	if (cart != null) {
  // 		let newCart = []
  // 		// get array of shop names  without  repeat
  // 		let shops = getshops()
  // 		//map over shop name
  // 		shops.map(shopname => {
  // 			let totalPrice = 0;
  // 			let items = []
  // 			// get items and totalprice of each shop
  // 			cart.items.forEach(item => {
  // 				if (item.shopName == shopname) {
  // 					items.push(item)
  // 					totalPrice += item.totalPrice
  // 				}
  // 			})
  // 			// new cart base on shop: {shopname:'' , items:[] , totalprice:number , shipping:5}
  // 			newCart.push({ shopName: shopname, items: items, total: totalPrice, shipping: 5 })
  // 		})
  // 		setCart(newCart)
  // 	}
  // }, [cart])

  const checkoutSubmit = () => {
    if (!profile.email) {
      setShowEmailModal(true);
      return;
    }
    navigate("/address");
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
          {cart.items.map((item, i) => (
            <>
              {cart.type == SHOP_TYPES.SHOPIFY ? (
                <ShopifyCheckoutItem
                  product={item.product}
                  variant={item.variant}
                  amount={item.amount}
                />
              ) : (
                <></>
              )}
            </>
          ))}

          <PriceWrapper>
            <Box>
              <PriceText>Total price: ${getTotalPrice().toFixed(2)}</PriceText>
            </Box>
          </PriceWrapper>

          <ButtonWrapper>
            <Box w={{ base: "150px", md: "200px" }} overflow="hidden">
              <BasicButton click={backToShop}>Back to shop</BasicButton>
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
