import { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/CartContext";
import { useProfile } from "../../../context/profile/ProfileContext";

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
    cart.forEach(
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

  return (
    <Flex
      w="100%"
      maxW="980px"
      m="0px auto"
      px={{ base: "20px", md: "80px" }}
      flexDirection="column"
    >
      {cart == null ? (
        <Loading />
      ) : (
        <>
          {cart.length == 0 ? (
            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontWeight="600"
              color="#fff"
              m="0px auto 40px auto"
            >
              Empty
            </Text>
          ) : (
            <>
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontWeight="600"
                color="#fff"
                m="0px auto 40px auto"
              >
                Checkout
              </Text>

              {/* {(cartBaseShop.length > 0) &&
								<>
									{cartBaseShop.map((shop, i) => {
										return <CheckoutShopItem key={i} shopItem={shop} />
									})
									}
								</>
							} */}
              {cart.map((item, i) => (
                <ShopifyCheckoutItem
                  product={item.product}
                  variant={item.variant}
                  amount={item.amount}
                />
              ))}

              <Flex
                w="100%"
                justifyContent="space-between"
                borderTop="2px"
                borderColor="#8053ff"
                pt="20px"
              >
                <Box>
                  <Text
                    color="#fff"
                    fontSize={{ base: "18px", md: "22px" }}
                    fontWeight="600"
                  >
                    {/* Total price: ${getTotalPrice().toFixed(2)} */}
                    Total price: ${getTotalPrice().toFixed(2)}
                  </Text>
                  <Text
                    color="#fff"
                    fontSize={{ base: "18px", md: "22px" }}
                    fontWeight="600"
                    mt="5px"
                  ></Text>
                </Box>

                <Box
                  w={{ base: "150px", md: "200px" }}
                  h={{ base: "40px", md: "40px" }}
                  //borderRadius="15px"
                  overflow="hidden"
                >
                  <BasicButton click={checkoutSubmit}>Check out</BasicButton>
                </Box>
              </Flex>
            </>
          )}
        </>
      )}
      {showEmailModal && <EmailModal close={closeEmailModal} />}
    </Flex>
  );
}

export default CheckoutPage;
