import {
  CheckoutItemWrapper,
  DetailWrapper,
  ProductImage,
  TitleWrapper,
  Title,
  VariantText,
  TotalPerItem,
  QuantityInput,
  IconWrapper,
  CounterWrapper,
  ButtonControllerWrapper,
  LockIconWrapper,
} from "./Checkout-item-style";
import { Box, Flex } from "@chakra-ui/react";
import {
  deleteSkuFromCart,
  updateQuantity,
} from "../../../../api/base-user/Cart-api";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useCart } from "../../../../context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import UnlockIcon from "../../../../components/shared/unlock-icon/unlockIcon";
import LockIcon from "../../../../components/shared/lock-icon/lockIcon";

const DroplinkedItem = ({ product, sku, quantity,lock, shopName }) => {
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToasty();
  const { updateCart } = useCart();
  const navigate = useNavigate();

  const getVariant = () => {
    if (sku.options.length == 0) return "";
    let optionArray = sku.options.map((option) => option.value);
    let text = optionArray.join(" / ");
    return text;
  };

  const clickOnProduct = () => navigate(`/${shopName}/merch/${product._id}`);

  const deleteMerch = async () => {
    setLoading(true);
    let result = await deleteSkuFromCart(sku._id);
    if (result == true) {
      successToast("Item removed");
      updateCart();
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  const updateAmount = async (newAmount) => {
    setLoading(true);
    let result = await updateQuantity(sku._id, newAmount);
    if (result == true) {
      successToast("Item added");
      updateCart();
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  const increaseQuantity = () => updateAmount(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity == 1) deleteMerch();
    else updateAmount(quantity - 1);
  };

  const getTotalPrice = () => {
    let total = parseFloat(sku.price) * quantity;
    return total.toFixed(2);
  };

  return (
    <CheckoutItemWrapper>
      <DetailWrapper>
        <ProductImage src={product.media[0].url} onClick={clickOnProduct} />

        <TitleWrapper>
          <Flex>
            <LockIconWrapper>
              {lock ? <LockIcon /> : <UnlockIcon />}
            </LockIconWrapper>
            <Title onClick={clickOnProduct}>{product.title}</Title>
          </Flex>
          <VariantText>{getVariant()}</VariantText>
          <VariantText>${sku.price}</VariantText>
        </TitleWrapper>
      </DetailWrapper>

      <ButtonControllerWrapper>
        <Flex justifyContent="space-between" alignItems="center" mb="10px">
          <CounterWrapper>
            <IconWrapper onClick={increaseQuantity}>
              <AiFillCaretUp
                color={loading ? "subLayer" : "white"}
                alignItem="center"
              />
            </IconWrapper>

            <QuantityInput value={quantity} />

            <IconWrapper onClick={decreaseQuantity}>
              <AiFillCaretDown color={loading ? "subLayer" : "white"} />
            </IconWrapper>
          </CounterWrapper>
          <TotalPerItem>${getTotalPrice()}</TotalPerItem>
        </Flex>
        <Box w="100%">
          <BasicButton disable={loading} cancelType={true} click={deleteMerch}>
            Remove
          </BasicButton>
        </Box>
      </ButtonControllerWrapper>
    </CheckoutItemWrapper>
  );
};

export default DroplinkedItem;
