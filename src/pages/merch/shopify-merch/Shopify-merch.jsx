import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../../context/cart/CartContext";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { checkRules } from "../../../services/nft-service/NFTcheck";
import { UseWalletInfo } from "../../../context/wallet/WalletContext";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  DescriptionText,
  ReadmoreButton,
  ReadmoreIconWrapper,
} from "../styles/Merch-style";
import { FiArrowDownCircle } from "react-icons/fi";

import Carousel from "../../../components/shared/Carousel/Carousel-component";
import ShopifyDetail from "./Shopify-merch-detail-component";

const ShopifyMech = ({ shopName, product }) => {
  const [loading, setLoading] = useState(false);
  const [testLimit, setTextLimit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const { userData, authenticate } = UseWalletInfo();
  const { addShopifyItemToCart } = useCart();
  const { successToast, errorToast } = useToasty();
  const { profile, signinWithaWallet } = useProfile();

  let images = product.shopifyData.images.map((img) => {
    return { url: img.src };
  });

  const checkGated = async () => {
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
    // if (userData == undefined) {
    //   authenticate();
    //   return;
    // }

    if (profile == null) {
      signinWithaWallet();
      return;
    }

    if (product.ruleset == undefined) {
      addToCardFunction();
    } else {
      const Rules = product.ruleset.rules.map((rule) => rule.address);
      setLoading(true);
      checkRules(userData.profile.stxAddress.mainnet, Rules)
        .then((e) => {
          if (e) {
            addToCardFunction();
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
    }

    //  let checkNftGated = await checkGated();
    // console.log();
    // if (!checkNftGated) return;
  };

  const addToCardFunction = () => {
    let itemObject = {
      amount: quantity,
      product: product.shopifyData,
      shopName: product.shopifyShopDomain,
      variant: selectedVariant,
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
        <ShopifyDetail
          product={product.shopifyData}
          shopName={shopName}
          quantity={quantity}
          setQuantity={setQuantity}
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
            <FiArrowDownCircle color="white" size="40px" />
          </ReadmoreIconWrapper>
        </DescriptionWrapper>
        {/* description */}
      </MerchPageWrapper>
    </>
  );
};

export default ShopifyMech;
