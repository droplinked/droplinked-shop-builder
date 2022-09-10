import { Box} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCart } from "../../context/cart/CartContext";
import { useToasty } from "../../context/toastify/ToastContext";
import { useProfile } from "../../context/profile/ProfileContext";
import { checkRules } from "../../services/nft-service/NFTcheck";
import { UseWalletInfo } from "../../context/wallet/WalletContext";
//import { useNavigate } from "react-router-dom";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  DescriptionText,
  ReadmoreButton,
} from "./Shopify-merch-style";

import Carousel from "../../components/shared/Carousel/Carousel-component";
// import Dropdown from "../../components/shared/Dropdown/Dropdown-component";
// import plus from "../../assest/icon/plusIcon.png";
// import minus from "../../assest/icon/minusIcon.png";
// import BasicButton from "../../components/shared/BasicButton/BasicButton";
import DetailComponent from "./Merch-detail-component";

const ShopifyMech = ({ shopName, product }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { userData, authenticate } = UseWalletInfo();
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const { profile } = useProfile();
 // const navigate = useNavigate();

  let images = product.shopifyData.images.map((img) => {
    return { url: img.src };
  });

  //console.log(product.shopifyData);

  // useEffect(() => {
  //   let opt = product.shopifyData.variants.map((vari) => {
  //     return { id: vari.id, value: vari.title };
  //   });
  //   setOptions(opt);
  //   setSelectedOption(opt[0].id);
  // }, []);

 

  const checkGated = async () => {
    if (product.ruleset == undefined) return true;

    const Rules = product.ruleset.rules.map((rule) => rule.address);
    setLoading(true);
    checkRules(userData.profile.stxAddress.mainnet, Rules)
      .then((e) => {
        if (e) {
          setLoading(false);
          return true;
        } else {
          setLoading(false);
          errorToast("Required NFT not found, accessed denied");
          return false;
        }
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.response.data);
        return false;
      });
  };

  const addItemToBasket = async () => {
    if (profile == null) {
      errorToast("Please login");
      return;
    }

    let checkNftGated = await checkGated();

    if (!checkNftGated) return;

    let selectedVar = product.shopifyData.variants.find(
      (variant) => variant.id == selectedOption
    );
    let itemObject = {
      amount: quantity,
      product: product.shopifyData,
      shopName: product.shopifyShopDomain,
      variant: selectedVar,
      productId: product._id,
    };
    successToast("Item added to cart");
    addShopifyItemToCart(itemObject);
  };



  const changeTextLimit = () => setTextLimit((p) => !p);

  return (
    <>
      <MerchPageWrapper>
        {/* images */}
        <Box w={{ base: "100%", md: "50%" }} minh="500px">
          <Carousel imagesArray={images} />
        </Box>
        {/* images */}

        {/* detail */}
        <DetailComponent
          title={product.shopifyData.title}
          shopName={shopName}
          price={product.shopifyData.variants[0].price}
          variants={product.shopifyData.variants}
          optionsList={product.shopifyData.options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          quantity={quantity}
          setQuantity={setQuantity}
          submit={addItemToBasket}
          loading={loading}
        />
        {/* detail */}

        {/* description */}
        <DescriptionWrapper>
          <DescriptionText
            dangerouslySetInnerHTML={{ __html: product.shopifyData.body_html }}
            display={testLimit == true ? "inline-block " : "-webkit-box"}
          />

          <ReadmoreButton onClick={changeTextLimit}>Read more</ReadmoreButton>
        </DescriptionWrapper>
        {/* description */}
      </MerchPageWrapper>
    </>
  );
};

export default ShopifyMech;

  // const decreaseQuantity = () => {
  //   if (quantity > 1) setQuantity((p) => p - 1);
  // };

  // const increaseQuantity = () => setQuantity((p) => p + 1);

   //const navigateToShoppage = () => navigate(`/${shopName}`);

{
  /* <DetailWrapper>
          <ProductTitle>{product.shopifyData.title}</ProductTitle>

          <ProductShopname onClick={navigateToShoppage}>
            {shopName}
          </ProductShopname>

          <Text fontWeight="600" fontSize="24px" color="#fff">
            ${product.shopifyData.variants[0].price}
          </Text>

          {selectedOption && (
            <Flex justifyContent="space-between" w="100%" flexWrap="wrap">
              <Box w="49%">
                <Dropdown
                  change={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  pairArray={options}
                  value={options[0].value}
                  placeholder={options[0].value}
                />
              </Box>
            </Flex>
          )}

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
            <BasicButton click={addItemToBasket} loading={loading}>
              Add to basket
            </BasicButton>
          </Box>
        </DetailWrapper> */
}
