import {
  DetailWrapper,
  ProductTitle,
  ProductShopname,
  QuantityButton,
  VariantSelect,
} from "../styles/Merch-style";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

import plus from "../../../../assest/icon/plusIcon.png";
import minus from "../../../../assest/icon/minusIcon.png";
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";

const DroplinkedDetail = ({
  product,
  shopName,
  selectedSku,
  setSelectedSku,
  quantity,
  setQuantity,
  submit,
  loading,
}) => {
  const navigate = useNavigate();
  const navigateToShoppage = () => navigate(`/${shopName}`);

  // find all options type in product and return array of objects like {{variantID:id , values:[]}}
  const getOptionsList = () => {
    let optionsId = product.skus[0].options.map((opt) => opt.variantID);
    let optionsType = [];
    if (optionsId.length > 0) {
      optionsId.forEach((opt) => {
        let values = [];
        product.skus.map((sku) => {
          let findOption = sku.options.find(
            (current) => current.variantID == opt
          );
          if (!values.includes(findOption.value)) values.push(findOption.value);
        });
        optionsType.push({ values: values, variantID: opt });
      });
    }
    return optionsType;
  };

  const optionsList = useMemo(() => getOptionsList(), [product]);
  // initialSelectedVariant
  const initialSelectedVariant = () => {
    if (optionsList.length == 0) {
      setSelectedSku(product.skus[0]);
    } else {
      product.skus.forEach((sku) => {
        let find = true;

        sku.options.forEach((option) => {
          let findOption = optionsList.find(
            (op) => op.variantID == option.variantID
          );

          if (
            option.variantID == findOption.variantID &&
            option.value != findOption.values[0]
          )
            find = false;
        });
        if (find) {
          setSelectedSku(sku);
          return;
        }
      });
    }
  };
  // initialSelectedVariant

  useEffect(() => {
    initialSelectedVariant();
  }, [product]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };
  const increaseQuantity = () => setQuantity((p) => p + 1);

  // change selectes sku besed on change  dropdown value
  const changeVariant = (e) => {
    let newOption = selectedSku.options.map((option) => {
      if (option.variantID == e.target.id)
        return { variantID: e.target.id, value: e.target.value };
      else return option;
    });

    product.skus.forEach((sku) => {
      let find = true;

      sku.options.forEach((option) => {
        let findOption = newOption.find(
          (op) => op.variantID == option.variantID
        );

        if (
          option.variantID == findOption.variantID &&
          option.value != findOption.value
        )
          find = false;
      });
      if (find) {
        setSelectedSku(sku);
        return;
      }
    });
  };

  return (
    <DetailWrapper>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductShopname onClick={navigateToShoppage}>{shopName}</ProductShopname>
      <Text fontWeight="600" fontSize="24px" color="#fff">
        ${selectedSku && selectedSku.price}
      </Text>
      <Flex justifyContent="space-between" w="100%" flexWrap="wrap">
        {optionsList.map((option, i) => {
          return (
            <Box w="49%" key={i}>
              <VariantSelect id={option.variantID} onChange={changeVariant}>
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
      {selectedSku && (
        <Box h="auto">
          <BasicButton
            click={submit}
            loading={loading}
            disabled={selectedSku.quantity <= 0}
          >
            {selectedSku.quantity > 0 ? "Add to basket" : "Sold out"}
          </BasicButton>
        </Box>
      )}
    </DetailWrapper>
  );
};

export default DroplinkedDetail;
