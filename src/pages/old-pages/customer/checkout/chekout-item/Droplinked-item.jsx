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
import { API_STATUS } from "../../../../constant/api-status";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useCart } from "../../../../context/cart/CartContext";
import {
  getDroplinkedTotalprice,
  getVariantsText,
} from "./checkout-item-utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import UnlockIcon from "./unlock-icon/unlockIcon";
import LockIcon from "./lock-icon/lockIcon";

const DroplinkedItem = ({ product, sku, quantity, lock, shopName }) => {
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToasty();
  const { updateCart } = useCart();
  const navigate = useNavigate();

  let totalPrice = getDroplinkedTotalprice(sku, quantity);
  let variantText = getVariantsText(sku);

  const clickOnProduct = () => navigate(`/${shopName}/merch/${product._id}`);

  const deleteMerch = async () => {
    setLoading(true);
    let result = await deleteSkuFromCart(sku._id);

    if (result.status == API_STATUS.SUCCESS) {
      successToast("Item removed");
      updateCart();
    } else {
      errorToast(result.data);
    }
    setLoading(false);
  };

  const updateAmount = async (newAmount) => {
    setLoading(true);
    let result = await updateQuantity(sku._id, newAmount);
    if (result.status == API_STATUS.SUCCESS) {
      successToast("Item added");
      updateCart();
    } else {
      errorToast(result.data);
    }
    setLoading(false);
  };

  const increaseQuantity = () => updateAmount(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity == 1) deleteMerch();
    else updateAmount(quantity - 1);
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
          <VariantText>{variantText}</VariantText>
          <VariantText>${sku.price}</VariantText>
        </TitleWrapper>
      </DetailWrapper>

      <ButtonControllerWrapper>
        <Flex justifyContent="space-between" alignItems="center" mb="10px">
          <CounterWrapper>
            <IconWrapper onClick={increaseQuantity}>
              <AiFillCaretUp
                color={loading ? "mainLayer" : "white"}
                alignItem="center"
              />
            </IconWrapper>

            <QuantityInput value={quantity} />

            <IconWrapper onClick={decreaseQuantity}>
              <AiFillCaretDown color={loading ? "mainLayer" : "white"} />
            </IconWrapper>
          </CounterWrapper>
          <TotalPerItem>${totalPrice}</TotalPerItem>
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
