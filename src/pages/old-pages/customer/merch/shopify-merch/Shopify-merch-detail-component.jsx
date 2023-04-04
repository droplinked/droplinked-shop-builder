import {
  DetailWrapper,
  ProductTitle,
  ProductShopname,
  QuantityButton,
  VariantSelect,
} from "../styles/Merch-style";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import plus from "../../../../assest/icon/plusIcon.png";
import minus from "../../../../assest/icon/minusIcon.png";
import RuleState from "../../components/rule-state-component/rule-state";

const ShopifyDetail = ({
  product,
  shopName,
  quantity,
  setQuantity,
  rule,
  lock,
  percent,
  submit,
  loading,
  selectedVariant,
  setSelectedVariant,
}) => {
  const [variants, setVariants] = useState(product.variants);
  const optionsList = product.options;

  const navigate = useNavigate();

  const hasRule = ((rule != undefined)&&(rule.rules.length > 0))?true:false

  useEffect(() => {
    if (percent) discountVariants();
  }, [percent]);

  useEffect(() => {
    initialVariant();
  }, [variants]);

    

  const discountVariants = () => {
    let percentage = percent / 100;
    let variantList = product.variants.map((variant) => {
      let currentPrice = parseFloat(variant.price).toFixed(2);
      return {
        ...variant,
        previousPrice: variant.price,
        price: currentPrice - currentPrice * percentage,
      };
    });
    setVariants(variantList);
  };

  // function
  const initialVariant = () => {
    let firstOption = optionsList.map((opt) => {
      return { name: opt.name, option_id: opt.id, value: opt.values[0] };
    });

    variants.forEach((variant) => {
      let find = true;

      variant.option_values.forEach((option) => {
        let findOption = firstOption.find(
          (opt) => opt.option_id == option.option_id
        );
        if (
          option.option_id == findOption.option_id &&
          option.value != findOption.value
        )
          find = false;
      });

      if (find == true) {
        setSelectedVariant(variant);
        return;
      }
    });
  };

  // function
  const navigateToShoppage = () => navigate(`/${shopName}`);
  // function
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };
  // function
  const increaseQuantity = () => setQuantity((p) => p + 1);
  // function
  const changeVariant = (e) => {
    let currentVariantOption = selectedVariant.option_values;

    let newVariantOption = currentVariantOption.map((option) => {
      if (option.option_id == e.target.id) {
        return {
          name: e.target.name,
          option_id: parseInt(e.target.id),
          value: e.target.value,
        };
      } else {
        return option;
      }
    });

    variants.forEach((variant) => {
      let find = true;
      variant.option_values.forEach((option) => {
        let findOption = newVariantOption.find(
          (op) => op.option_id == option.option_id
        );

        if (
          findOption.option_id == option.option_id &&
          option.value != findOption.value
        ) {
          find = false;
        }
      });
      if (find == true) {
        setSelectedVariant(variant);
        return;
      }
    });
  };

  return (
    <DetailWrapper>
      {selectedVariant && (
        <>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductShopname onClick={navigateToShoppage}>{shopName}</ProductShopname>

            {selectedVariant.previousPrice ? (
                <Flex
                  mb={{ base: "20px", md: "10px", lg: "30px" }}
                  alignItems="flex-end"
                >
                  <Text fontWeight="600" fontSize="24px" color="#fff" mr="16px">
                    ${selectedVariant && selectedVariant.price}
                  </Text>

                  <Text fontWeight="600" fontSize={{base:"10px",md:"14px"}} color="lightGray">
                    ${selectedVariant && selectedVariant.previousPrice}
                  </Text>
                </Flex>
              ) : (
                <Text
                  fontWeight="600"
                  fontSize="24px"
                  color="#fff"
                  mb={{ base: "20px", md: "10px", lg: "30px" }}
                >
                  ${selectedVariant && selectedVariant.price}
                </Text>
              )}
          {hasRule && <RuleState lock={lock} description={rule.rules[0].description} />}

          
            {/* <Flex>
             

               {lock != null && (
                <Box
                  mt={{ base: "5px", md: "0px" }}
                  ml="15px"
                  w={{ base: "25px", md: "36px" }}
                  h={{ base: "25px", md: "36px" }}
                  p={{ base: "4px", md: "6px" }}
                  bgColor="#222"
                  borderRadius="50%"
                >
                  {lock == true ? <LockIcon /> : <UnlockIcon />}
                </Box>
              )} 
            </Flex> */}
           
            <Flex justifyContent="space-between" w="100%" flexWrap="wrap">
              {optionsList.map((option, i) => {
                return (
                  <Box w="49%" key={i}>
                    <VariantSelect
                      id={option.id}
                      name={option.name}
                      onChange={changeVariant}
                    >
                      {option.values.map((value, i) => {
                        return (
                          <option key={i} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </VariantSelect>
                  </Box>
                );
              })}
            </Flex>

            <Flex>
              <QuantityButton
                 bgColor="#353536"
                 color="#b3b3b3"
                 cursor="pointer"
                onClick={decreaseQuantity}
              >
                <Image src={minus} alt="minus" />
              </QuantityButton>

              <QuantityButton color="white" fontSize="20px">
                {quantity}
              </QuantityButton>

              <QuantityButton
                bgColor="#353536"
                color="#b3b3b3"
                cursor="pointer"
                onClick={increaseQuantity}
              >
                <Image src={plus} alt="minus" />
              </QuantityButton>
            </Flex>

            <Box h="auto">
              <BasicButton click={submit} loading={loading}>
                Add to basket
              </BasicButton>
            </Box>

            {/* <Box h="auto">
              <BasicButton
                click={submit}
                loading={loading}
                disabled={selectedVariant.inventory_quantity <= 0}
              >
                {selectedVariant.inventory_quantity > 0
                  ? "Add to basket"
                  : "Sold out"}
              </BasicButton>
            </Box> */}
          
        </>
      )}
    </DetailWrapper>
  );
};
export default ShopifyDetail;
