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
import { isGated } from "../../../../utils/gated.utils/gated-utils";
import { FiArrowDownCircle } from "react-icons/fi";
import { getUserAddress } from "../../../../services/wallet-auth/api";
import { getMaxDiscount } from "../../../../services/nft-service/maxDiscount";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import ShopifyDetail from "./Shopify-merch-detail-component";

const ShopifyMech = ({ shopName, product , openLogin}) => {
  const [loading, setLoading] = useState(false);
  // if product cant pass rule lock value == true
  const [lock, setLock] = useState(true);
  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [rulePassed, setRulePassed] = useState(null);

  const { userData } = UseWalletInfo();
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const { profile ,signinWithaWallet } = useProfile();

  let images = product.shopifyData.images.map((img) => {
    return { url: img.src };
  });

  useEffect(() => {
    if (isGated(product.ruleset)) {
      if (userData != undefined) {
        checkGated();
        findPassedRuleset();
      } else setLock(true);
    } else setLock(null);
  }, [userData]);

  const checkGated = () => {
    const Rules = product.ruleset.rules.map((rule) => rule.address);
    setLoading(true);
    checkRules(userData.profile.stxAddress.mainnet, Rules)
      .then((e) => {
        if (e) {
          setLoading(false);
          setLock(false);
        } else {
          setLoading(false);
          setLock(true);
        }
      })
      .catch((e) => {
        setLoading(false);
        setLock(true);
        errorToast(e.response.data);
      });
  };

  // const addToPreCard = () => {
  //   const itemObject = {
  //     amount: quantity,
  //     product: product.shopifyData,
  //     shopName: product.shopifyShopDomain,
  //     variant: selectedVariant,
  //     productId: product._id,
  //     productRule:
  //       product.ruleset == undefined ? undefined : product.ruleset.rules,
  //   };
  //   successToast("Item added to cart");
  //   addShopifyItemToCart(itemObject);
  // };

  const addItemToBasket = async () => {
    if (profile == null) {
      if (isGated(product.ruleset)) signinWithaWallet()
      else openLogin()
      // signinWithaWallet();
      //addToPreCard();
      return;
    } else {
      if (lock) errorToast("Required NFT not found, accessed denied");
      else addToCardFunction();
    }
  };

  const addToCardFunction = async() => {
    let itemObject = {
      amount: quantity,
      product: product.shopifyData,
      shopName: product.shopifyShopDomain,
      variant: selectedVariant,
      productId: product._id,
    };
    successToast("Item added to cart");
    if(rulePassed) addShopifyItemToCart(itemObject , true)
    else addShopifyItemToCart(itemObject);
  };

  const changeTextLimit = () => setTextLimit((p) => !p);

  // find rule that passed
  const findPassedRuleset = async () => {
    let res = await getMaxDiscount(
      getUserAddress(userData).mainnet,
      product.ruleset.rules
    );
    setRulePassed(res);
  };

  return (
    <>
      <MerchPageWrapper>
        {/* images */}
        <Box w={{ base: "100%", sm: "100%" , md:'50%' }} minh="500px">
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
          rulePassed={rulePassed}
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
