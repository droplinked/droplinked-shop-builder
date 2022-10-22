import {
  CheckoutItemWrapper,
  DetailWrapper,
  ProductImage,
  TitleWrapper,
  Title,
  VariantText,
  ButtonWrapper,
  InputQuantity,
  SubmitQuantity,
  PriceText,
} from "./Checkout-item-style";
import { AiOutlineDelete } from "react-icons/ai";
import { ButtonGroup, IconButton, Input, Button } from "@chakra-ui/react";
import {
  deleteSkuFromCart,
  updateQuantity,
} from "../../../../../api/base-user/Cart-api";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { useCart } from "../../../../../context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DroplinkedItem = ({ product, sku, quantity, shopName }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(quantity);

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

  const changeAmount = (e) => setAmount(e.target.value);

  const updateAmount = async () => {
    setLoading(true);
    let result = await updateQuantity(sku._id, amount);
    if (result == true) {
      successToast("Item added");
      updateCart();
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  return (
    <CheckoutItemWrapper>
      <DetailWrapper>
        <ProductImage src={product.media[0].url} onClick={clickOnProduct} />
        <TitleWrapper>
          <Title onClick={clickOnProduct}>{product.title}</Title>
          <VariantText>{getVariant()}</VariantText>
        </TitleWrapper>
      </DetailWrapper>
      <ButtonWrapper>
        <ButtonGroup size="md" isAttached variant="outline">
          <IconButton
            aria-label="delete"
            icon={
              <AiOutlineDelete
                color="#fd4545"
                size="sm"
                style={{ maxHeight: "100%" }}
              />
            }
            _hover={{ bgColor: "none", borderColor: "#8053ff" }}
            _focus={{ bgColor: "none", borderColor: "#8053ff" }}
            _active={{ bgColor: "none", borderColor: "#8053ff" }}
            onClick={deleteMerch}
            disabled={loading}
          />
          <Input {...InputQuantity} value={amount} onChange={changeAmount} />
          <Button
            {...SubmitQuantity}
            onClick={updateAmount}
            disabled={loading}
          >
            Submit
          </Button>
        </ButtonGroup>
        <PriceText>${sku.price}</PriceText>
      </ButtonWrapper>
    </CheckoutItemWrapper>
  );
};

export default DroplinkedItem;
