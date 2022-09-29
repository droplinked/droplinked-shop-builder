import {
  Input,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  CheckoutItemWrapper,
  DetailWrapper,
  ProductImage,
  TitleWrapper,
  Title,
  VariantText,
} from "./Checkout-item-style";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useCart } from "../../../../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton"

const ShopifytItem = ({ product, variant, amount, shopName }) => {

  const { deleteItemFromCart, changeQuantity } = useCart();
  const navigate = useNavigate();

  const clickOnProduct = () => navigate(`/${shopName}/merch/${product._id}`);

 // const changeAmount = (e) => setQuantity(e.target.value);

 // const submitChange = () => changeQuantity(quantity, variant.id);

  const deleteItem = () => deleteItemFromCart(variant.id);

  const getTotalItem = () => (parseFloat(variant.price)*amount).toFixed(1)

  const increaseQuantity = () => changeQuantity(amount+1, variant.id);

  const decreaseQuantity = () => {
    if(amount == 1){
      deleteItemFromCart(variant.id);
    }else{
      changeQuantity(amount-1, variant.id);
    }
  }


  return (
    <>
      <CheckoutItemWrapper>

        <DetailWrapper>

          <ProductImage src={product.images[0].src} onClick={clickOnProduct} />

          <TitleWrapper>
            <Title onClick={clickOnProduct}>{product.title}</Title>

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

        <Flex 
        flexDir='column'
        justifyContent="space-between"
        w={{ base: "100%", md: "35%" }}
         >

          <Flex
            justifyContent="space-between"
            alignItems="center"
            //h='45%'
          >
            <Flex w="60%"  border="1px solid gray" borderRadius='8px' mb='10px' px='20px'>
              <Flex justifyContent="center" alignItems="center"  onClick={increaseQuantity} cursor="pointer">
                <AiFillCaretUp
                  color="white"
                  alignItem="center"
                />
              </Flex>
              <Input
                value={amount}
                color="#fff"
                border="none"
                fontWeight="600"
                textAlign="center"
                outline='none'
                _focus={{
                  border:'none', 
                  outline:'none'
                }}
                fontSize={{ base: "16px", md: "20px" }}
              />
              <Flex justifyContent="center" alignItems="center" onClick={decreaseQuantity} cursor="pointer" >
                <AiFillCaretDown color="white" />
              </Flex>
            </Flex>

            <Box
              w="35%"
              fontWeight="600"
              fontSize={{ base: "16px", md: "20px" }}
              color="#fff"
              textAlign='end'
            >
              ${getTotalItem()}
            </Box>
          </Flex>

          <Box w='100%' >
          <BasicButton cancelType={true} click={deleteItem}>Remove</BasicButton>
          </Box>

        </Flex>

        {/* <ButtonWrapper>
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
      </ButtonWrapper> */}
      </CheckoutItemWrapper>
    </>
  );
};
export default ShopifytItem;
