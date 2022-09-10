import {
  MerchPageWrapper,
  DetailWrapper,
  ProductTitle,
  ProductShopname,
  QuantityButton,
  DescriptionWrapper,
  DescriptionText,
  ReadmoreButton,
  VariantSelect,
} from "./Shopify-merch-style";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Dropdown from "../../components/shared/Dropdown/Dropdown-component";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import plus from "../../assest/icon/plusIcon.png";
import minus from "../../assest/icon/minusIcon.png";
import { FALSE } from "sass";

const DetailComponent = ({
  title,
  shopName,
  price,
  variants,
  optionsList,
  selectedOption,
  setSelectedOption,
  quantity,
  setQuantity,
  submit,
  loading,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const navigate = useNavigate();
  console.log(selectedVariant);
  console.log(optionsList);
  // console.log(optionsList);
  useEffect(() => {
    initialVariant();
  }, []);

  const initialVariant = () => {

    // let firstOption = optionsList.map((opt) => {
    //   return { name: opt.name, option_id: opt.id, value: opt.values[0] };
    // });

    // variants.forEach((variant) => {
    //   let find = true;

    //   variant.option_values.forEach((option) => {
    //     if (
    //       option.option_id == firstOption.option_id &&
    //       option.value != firstOption.value
    //     )
    //       find = false;
    //   });

    //   if (find == true) {
    //     setSelectedVariant(variant)
    //   };
    // });
  };

  const navigateToShoppage = () => navigate(`/${shopName}`);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  const increaseQuantity = () => setQuantity((p) => p + 1);

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

    // console.log(newVariantOption);
    let find = true;
    variants.forEach((variant) => {
      variant.option_values.forEach((option) => {
        let findOption = newVariantOption.find(
          (op) => op.option_id == option.option_id
        );
        let find = false;
        //console.log(option);
        //console.log(findOption);
        if (
          option.value == findOption.value &&
          findOption.option_id == e.target.id
        ) {
          find = true;
          setSelectedVariant(variant);
          return;
        }
      });
      if (find == true) return;
    });
  };

  return (
    <DetailWrapper>
      <ProductTitle>{title}</ProductTitle>
      <ProductShopname onClick={navigateToShoppage}>{shopName}</ProductShopname>
      <Text fontWeight="600" fontSize="24px" color="#fff">
        ${selectedVariant && selectedVariant.price}
      </Text>

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
    </DetailWrapper>
  );
};
export default DetailComponent;
