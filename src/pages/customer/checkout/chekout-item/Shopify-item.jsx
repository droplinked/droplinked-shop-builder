import { Box, Flex } from "@chakra-ui/react";
import {
  CheckoutItemWrapper,
  DetailWrapper,
  ProductImage,
  TitleWrapper,
  Title,
  VariantText,
  ButtonControllerWrapper,
  CounterWrapper,
  QuantityInput,
  IconWrapper,
  TotalPerItem,
  LockIconWrapper,
} from "./Checkout-item-style";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useCart } from "../../../../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

import UnlockIcon from "./unlock-icon/unlockIcon";
import LockIcon from "./lock-icon/lockIcon";
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";

const ShopifytItem = ({ product, variant, lock, amount, shopName }) => {
  const { deleteItemFromCart, changeQuantity } = useCart();
  const navigate = useNavigate();

  const clickOnProduct = () => navigate(`/${shopName}/merch/${product._id}`);

  const deleteItem = () => deleteItemFromCart(variant.id);

  const getTotalItem = () => (parseFloat(variant.price) * amount).toFixed(2);

  const increaseQuantity = () => changeQuantity(amount + 1, variant.id);

  const decreaseQuantity = () => {
    if (amount == 1) {
      deleteItemFromCart(variant.id);
    } else {
      changeQuantity(amount - 1, variant.id);
    }
  };

  return (
    <>
      <CheckoutItemWrapper>
        <DetailWrapper>
          <ProductImage src={product.images[0].src} onClick={clickOnProduct} />

          <TitleWrapper>
            <Flex>
              {lock != null && (
                <LockIconWrapper>
                  {lock == true ? <LockIcon /> : <UnlockIcon />}
                </LockIconWrapper>
              )}
              <Title onClick={clickOnProduct}>{product.title}</Title>
            </Flex>

            {variant && (
              <VariantText
                color="#ddd"
                fontWeight="500"
                fontSize={{ base: "14px", md: "18px" }}
              >
                {variant.option_values[0].name}:{" "}
                {variant.option_values[0].value}
              </VariantText>
            )}
            <VariantText>${variant.price}</VariantText>
          </TitleWrapper>
        </DetailWrapper>

        <ButtonControllerWrapper>
          <Flex justifyContent="space-between" alignItems="center" mb="10px">
            <CounterWrapper>
              <IconWrapper onClick={increaseQuantity}>
                <AiFillCaretUp color="white" alignItem="center" />
              </IconWrapper>

              <QuantityInput value={amount} />

              <IconWrapper onClick={decreaseQuantity}>
                <AiFillCaretDown color="white" />
              </IconWrapper>
            </CounterWrapper>

            <TotalPerItem>${getTotalItem()}</TotalPerItem>
          </Flex>

          <Box w="100%">
            <BasicButton cancelType={true} click={deleteItem}>
              Remove
            </BasicButton>
          </Box>
        </ButtonControllerWrapper>
      </CheckoutItemWrapper>
    </>
  );
};
export default ShopifytItem;
