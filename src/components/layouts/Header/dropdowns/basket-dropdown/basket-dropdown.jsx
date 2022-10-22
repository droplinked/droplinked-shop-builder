

import {  Box } from "@chakra-ui/react";
import { useCart } from "../../../../../context/cart/CartContext";
import BasicButton from "../../../../shared/BasicButton/BasicButton";
import { useNavigate, useParams } from "react-router-dom";
import { SHOP_TYPES } from "../../../../../constant/shop-types";
import { ShopPageContainer ,EmptyText} from "./basket-dropdown-style"

import DroplinkedItem from "./basket-item/droplinked-item-cart";
import ShopifyCartItem from "./basket-item/shopify-item-cart";

export default function BasketModal({ close }) {
  const { cart } = useCart();
  console.log(cart);
  let navigate = useNavigate();
  let { shopname } = useParams();

  const ClickCheckuot = () => {
    navigate(`${shopname}/checkout`);
    close();
  };

  return (
    <ShopPageContainer>
      {cart == null || cart.items.length == 0 ? (
        <EmptyText>
          Empty
        </EmptyText>
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
          <Box mt="20px">
            <BasicButton click={ClickCheckuot}> Check out</BasicButton>
          </Box>
        </>
      )}
    </ShopPageContainer>
  );
}
