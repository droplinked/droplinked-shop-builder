import "./basket-modal-style.scss";

import { Text, Button , Box } from "@chakra-ui/react";
import CartProvider, { useCart } from "../../../../../context/cart/CartContext";
import BasicButton from "../../../../shared/BasicButton/BasicButton"
import { useNavigate } from "react-router-dom";
import { SHOP_TYPES } from "../../../../../constant/shop-types";

import DroplinkedItem from "./basket-item/droplinked-item-cart";
import ShopifyCartItem from "./basket-item/shopify-item-cart";

export default function BasketModal({ close }) {
  const { cart } = useCart();
  console.log(cart);
  let navigate = useNavigate();

  const ClickCheckuot = () => {
    navigate("/checkout");
    close();
  };

  return (
    <div className="basket-modal-wrapper">
      {cart == null || cart.items.length == 0 ? (
        <Text
          color="white"
          w="100%"
          textAlign="center"
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="600"
          my={{ base: "0px", md: "20px" }}
          h="100%"
        >
          Empty
        </Text>
      ) : (
        <>
          {cart.items.map((item, i) => {
            return (
              <>
                {cart.type == SHOP_TYPES.DROPLINKED ? (
                  <DroplinkedItem key={i} item={item} close={close} />
                ) : (
                  <ShopifyCartItem
                    key={i}
                    product={item.product}
                    amount={item.amount}
                    variant={item.variant}
                  />
                )}
              </>
            );
          })}
          {/* <Button
            mt="20px"
            color="white"
            w="100%"
            bgColor="#8053ff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ color: "#222" }}
            onClick={ClickCheckuot}
          >
            Check out
          </Button> */}
          <Box mt="20px">
          <BasicButton click={ClickCheckuot}> Check out</BasicButton>
          </Box>
        </>
      )}
    </div>
  );
}
