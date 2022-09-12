import { ButtonGroup, IconButton, Button, Input } from "@chakra-ui/react";
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
import { useCart } from "../../../../context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ShopifytItem = ({ product, variant, amount, shopName }) => {
  const [quantity, setQuantity] = useState(amount);

  const { deleteItemFromCart, changeQuantity } = useCart();
  const navigate = useNavigate();

  const clickOnProduct = () => navigate(`/${shopName}/merch/${product._id}`);

  const changeAmount = (e) => setQuantity(e.target.value);

  const submitChange = () => changeQuantity(quantity, variant.id);

  const deleteItem = () => deleteItemFromCart(variant.id);

  return (
    <CheckoutItemWrapper>
      <DetailWrapper>
        <ProductImage src={product.images[0].src} onClick={clickOnProduct} />
        <TitleWrapper>
          <Title onClick={clickOnProduct}>{product.title}</Title>

          {variant && (
            <VariantText
              color="#ddd"
              fontWeight="500"
              fontSize={{ base: "14px", md: "13px" }}
            >
              {variant.option_values[0].name} : {variant.option_values[0].value}
            </VariantText>
          )}
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
            onClick={deleteItem}
          />
          <Input {...InputQuantity} value={quantity} onChange={changeAmount} />
          <Button {...SubmitQuantity} onClick={submitChange}>
            Submit
          </Button>
        </ButtonGroup>

        <PriceText>${variant.price}</PriceText>
      </ButtonWrapper>
    </CheckoutItemWrapper>
  );
};
export default ShopifytItem;
