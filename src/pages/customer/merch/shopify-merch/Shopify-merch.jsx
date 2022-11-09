import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCart } from "../../../../context/cart/CartContext";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { checkRules } from "../../../../services/nft-service/NFTcheck";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  DescriptionText,
  ReadmoreIconWrapper,
} from "../styles/Merch-style";
//import { isGated } from "../../../../utils/gated.utils/gated-utils";
import {
  getMaxDiscount,
  gatedPassesRules,
} from "../../../../services/NFTCheck";
import { FiArrowDownCircle } from "react-icons/fi";
import { getUserAddress } from "../../../../services/wallet-auth/api";
//import { getMaxDiscount } from "../../../../services/nft-service/maxDiscount";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import ShopifyDetail from "./Shopify-merch-detail-component";

const ShopifyMech = ({ shopName, product, openLogin }) => {
  const [loading, setLoading] = useState(false);
  // if product cant pass rule lock value == true
  const [lock, setLock] = useState(true);

  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [percent, setPercent] = useState(null);

  const { userData } = UseWalletInfo();
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const { profile, signinWithaWallet } = useProfile();

  const isGated = product.ruleset == undefined ? false : true;

  let images = product.shopifyData.images.map((img) => {
    return { url: img.src };
  });

  console.log(product);

  useEffect(() => {
    if (isGated && userData) checkProductRule();
  }, [userData]);

  const checkProductRule = async () => {
    if (product.ruleset.gated) {
      let result = await gatedPassesRules(
        getUserAddress(userData).mainnet,
        product.ruleset
      );
    } else {
      let result = await getMaxDiscount(
        getUserAddress(userData).mainnet,
        product.ruleset
      );
      console.log(result);
      if (result.NFTsPassed.length > 0) {
        setPercent(result.discountPercentage);
       // setLock(false);
      }
    }
  };

  const addItemToBasket = async () => {
    if (profile == null) {
      if (isGated) signinWithaWallet();
      else openLogin();
      return;
    }

    if (userData == undefined && isGated) {
      signinWithaWallet();
      return;
    }

    // if (isGated) {
    //   if (lock) errorToast("Required NFT not found, accessed denied");
    //   else addToCardFunction();
    // } else {
    //   addToCardFunction();
    // }
    addToCardFunction();

    // if (profile == null) {
    //   if (isGated) signinWithaWallet();
    //   else openLogin();
    //   // signinWithaWallet();
    //   //addToPreCard();
    //   return;
    // } else {
    //   if (lock) errorToast("Required NFT not found, accessed denied");
    //   else addToCardFunction();
    // }
  };

  const addToCardFunction = async () => {
    let itemObject = {
      amount: quantity,
      product: product.shopifyData,
      shopName: product.shopifyShopDomain,
      variant: selectedVariant,
      productId: product._id,
    };
    successToast("Item added to cart");
    if (percent) addShopifyItemToCart(itemObject, true);
    else addShopifyItemToCart(itemObject);
  };

  const changeTextLimit = () => setTextLimit((p) => !p);

  // find rule that passed
  // const findPassedRuleset = async () => {
  //   let res = await getMaxDiscount(
  //     getUserAddress(userData).mainnet,
  //     product.ruleset.rules
  //   );
  //   //setRulePassed(res);
  // };

  return (
    <>
      <MerchPageWrapper>
        {/* images */}
        <Box w={{ base: "100%", sm: "100%", md: "50%" }} minh="500px">
          <Carousel imagesArray={images} />
        </Box>
        {/* images */}

        {/* detail */}
        <ShopifyDetail
          product={product.shopifyData}
          shopName={shopName}
          quantity={quantity}
          lock={lock}
          setQuantity={setQuantity}
          percent={percent}
          submit={addItemToBasket}
          loading={loading}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        {/* detail */}

        {/* description */}
        <DescriptionWrapper>
          <DescriptionText
            dangerouslySetInnerHTML={{ __html: product.shopifyData.body_html }}
            display={testLimit == true ? "inline-block " : "-webkit-box"}
          />

          {/* <ReadmoreButton onClick={changeTextLimit}>Read more</ReadmoreButton> */}

          <ReadmoreIconWrapper
            onClick={changeTextLimit}
            transform={testLimit == true ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <FiArrowDownCircle color="#DBDBDB" size="40px" />
          </ReadmoreIconWrapper>
        </DescriptionWrapper>
        {/* description */}
      </MerchPageWrapper>
    </>
  );
};

export default ShopifyMech;
