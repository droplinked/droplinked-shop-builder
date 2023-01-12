import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCart } from "../../../../context/cart/CartContext";
import { useToasty } from "../../../../context/toastify/ToastContext";
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
} from "../../../../services/check-rule-service/check-rule";
import { FiArrowDownCircle } from "react-icons/fi";
import { getUserAddress } from "../../../../services/wallet-auth/api";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentProfile } from "../../../../store/profile/profile.selector";
import { setCurrentUser } from "../../../../store/profile/profile.action";
import { signinViaHirowallet } from "../../../../utils/hirowallet/hirowallet-utils";
import { selectHiroWalletData } from "../../../../store/hiro-wallet/hiro-wallet.selector";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import ShopifyDetail from "./Shopify-merch-detail-component";

const VIDEO_URL =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

const ShopifyMech = ({ shopName, product, openLogin }) => {
  const [loading, setLoading] = useState(false);
  // if product cant pass rule lock value == true
  const [lock, setLock] = useState(true);

  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [percent, setPercent] = useState(null);

  const dispatch = useDispatch();
  const userData = useSelector(selectHiroWalletData);
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const profile = useSelector(selectCurrentProfile);

  const addUser = (data) => dispatch(setCurrentUser(data));

  const signInWallet = () => signinViaHirowallet(profile, addUser);

  const gatedStatus =
    product.ruleset == undefined || product.ruleset.rules.length == 0
      ? "PUBLIC"
      : product.ruleset.gated
      ? "GATED"
      : "DISCOUNT";

  const isGated = product.ruleset == undefined ? false : true;

  let images = product.shopifyData.images.map((img) => {
    return { url: img.src };
  });

  useEffect(() => {
    if (gatedStatus != "PUBLIC" && userData) checkProductRule();
  }, [userData]);

  // const checkProductRule = async () => {

  //   if (gatedStatus == "GATED") {
  //       let result = await gatedPassesRules(
  //         getUserAddress(userData).mainnet,
  //         product.ruleset
  //       );
  //       if (result) setLock(false);
  //   }
  //   else {
  //       let result = await getMaxDiscount(
  //         getUserAddress(userData).mainnet,
  //         product.ruleset
  //       );
  //       if (result.NFTsPassed.length > 0)  setPercent(result.discountPercentage);
  //     }
  // };

  const checkProductRule = async () => {
    if (gatedStatus == "GATED") {
      let result = await gatedPassesRules(
        getUserAddress(userData).mainnet,
        product.ruleset
      );
      if (result) setLock(false);
    } else {
      let result = await getMaxDiscount(
        getUserAddress(userData).mainnet,
        product.ruleset
      );
      if (result.NFTsPassed.length > 0) {
        setPercent(result.discountPercentage);
        setLock(false);
      }
    }
  };

  // const discountSkus = (percentage) => {
  //   let currentSku = product.skus.map((sku) => {
  //     let newPrice = parseFloat(
  //       sku.price - sku.price * (percentage / 100)
  //     ).toFixed(2);
  //     return { ...sku, price: newPrice, previousPrice: sku.price };
  //   });
  //   const newProduct = { ...product, skus: currentSku };
  //   setProduct(newProduct);
  // };

  const addItemToBasket = async () => {
    if (profile == null) {
      if (gatedStatus != "PUBLIC") signInWallet();
      else openLogin();
      return;
    }

    if (userData == undefined && isGated) {
      signInWallet();
      return;
    }

    if (gatedStatus == "GATED" && lock) {
      errorToast("Required NFT not found, accessed denied");
      return;
    }

    addToCardFunction();
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
    if (gatedStatus !== "PUBLIC") addShopifyItemToCart(itemObject, true);
    else addShopifyItemToCart(itemObject);
  };

  const changeTextLimit = () => setTextLimit((p) => !p);

  const getVideoUrl = () => {
    if (product._id == "635aab29783d1c18937c167f")
      return "https://res.cloudinary.com/djh0wdj3m/video/upload/v1667599059/samurai-shirt_n4nptf.mp4";
    else if (product._id == "635aab29783d1c18937c1680")
      return "https://upload-droplonked.s3.us-west-2.amazonaws.com/geisha-shirt-3D-sq.mp4";
    else return undefined;
  };

  const videoUrl = getVideoUrl();
  return (
    <>
      <MerchPageWrapper>
        {/* images */}
        <Box w={{ base: "100%", sm: "100%", md: "50%" }} minh="500px">
          <Carousel videoUrl={videoUrl} imagesArray={images} />
        </Box>
        {/* images */}

        {/* detail */}
        <ShopifyDetail
          product={product.shopifyData}
          shopName={shopName}
          quantity={quantity}
          lock={lock}
          rule={product.ruleset}
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
