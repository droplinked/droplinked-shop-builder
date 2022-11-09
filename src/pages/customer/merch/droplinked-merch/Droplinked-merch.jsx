//import "../Merch-page-style.scss";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../context/toastify/ToastContext";
//import { checkRules } from "../../../../services/nft-service/NFTcheck";
import { useCart } from "../../../../context/cart/CartContext";
import { addSkuToCart } from "../../../../api/base-user/Cart-api";
import { getUserAddress } from "../../../../services/wallet-auth/api";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  ReadmoreIconWrapper,
  DescriptionTextWrapper,
} from "../styles/Merch-style";
//import { isGated } from "../../../../utils/gated.utils/gated-utils";
import { FiArrowDownCircle } from "react-icons/fi";
import {
  getMaxDiscount,
  gatedPassesRules,
} from "../../../../services/NFTCheck";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import DroplinkedDetail from "./Droplinked-merch-detail";

const DroplinkedMerch = ({ bproduct, openLogin }) => {
  const [product, setProduct] = useState(bproduct);
  const [quantity, setQuantity] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  const [textLimit, setTextLimit] = useState(false);

  const [selectedSku, setSelectedSku] = useState(null);

  const { userData } = UseWalletInfo();
  const { profile, signinWithaWallet } = useProfile();
  const { errorToast, successToast } = useToasty();
  const { updateCart } = useCart();

  let params = useParams();
  let shopname = params.shopname;
  let images = product.media;
  const isGated = product.ruleset == undefined ? false : true;
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
      if (result.NFTsPassed.length > 0) discountSkus(result.discountPercentage);
    }
  };

  const discountSkus = (percentage) => {
    let currentSku = product.skus.map((sku) => {
      let newPrice = parseFloat(
        sku.price - sku.price * (percentage / 100)
      ).toFixed(2);
      return { ...sku, price: newPrice, previousPrice: sku.price };
    });
    const newProduct = { ...product, skus: currentSku };
    setProduct(newProduct);
  };

  // add to baskset functionality
  const Addtobasket = async () => {
    if (profile == null) {
      if (isGated) signinWithaWallet();
      else openLogin();
      return;
    }

    if (userData == undefined && isGated) {
      signinWithaWallet();
      return;
    }

    if (quantity == 0) {
      errorToast("Please add items");
      return;
    }

    const cart = {
      skuID: selectedSku._id,
      quantity: quantity,
    };

    setDisableBtn(true);
    if (!product.ruleset.gated) {
      await addMerhcToCart(cart);
      setDisableBtn(false);
      return;
    }

    // const Rules = product.ruleset.rules.map((rule) => rule.address);

    // setDisableBtn(true);
    // checkRules(userData.profile.stxAddress.mainnet, Rules)
    //   .then(async (e) => {
    //     if (e) {
    //       await addMerhcToCart(cart);
    //     } else {
    //       setDisableBtn(false);
    //       errorToast("Required NFT not found, accessed denied");
    //     }
    //   })
    //   .catch((e) => {
    //     setDisableBtn(false);
    //     errorToast(e.response.data);
    //   });
  };

  const addMerhcToCart = async (cart) => {
    setDisableBtn(true);
    let result = await addSkuToCart(cart);
    if (result == true) {
      localStorage.setItem("cart", JSON.stringify(null));
      successToast("Item added to cart");
      setQuantity(1);
      updateCart();
    } else {
      errorToast(result);
    }
    setDisableBtn(false);
  };

  const changeTextLimit = () => setTextLimit((p) => !p);

  return (
    <MerchPageWrapper>
      {/* imgage side */}
      <Box w={{ base: "100%", sm: "100%", md: "50%" }} minh="500px">
        <Carousel imagesArray={images} />
      </Box>
      {/* imgage side */}

      {/* detail side */}
      <DroplinkedDetail
        product={product}
        shopName={shopname}
        selectedSku={selectedSku}
        setSelectedSku={setSelectedSku}
        quantity={quantity}
        setQuantity={setQuantity}
        submit={Addtobasket}
        loading={disableBtn}
      />
      {/* detail side */}
      {/* description */}
      <DescriptionWrapper>
        <DescriptionTextWrapper
          whiteSpace={textLimit == true ? "pre-line" : "nowrap"}
        >
          {product.description}
        </DescriptionTextWrapper>
        <ReadmoreIconWrapper
          onClick={changeTextLimit}
          transform={textLimit == true ? "rotate(180deg)" : "rotate(0deg)"}
        >
          <FiArrowDownCircle color="white" size="40px" />
        </ReadmoreIconWrapper>
      </DescriptionWrapper>
      {/* description */}
    </MerchPageWrapper>
  );
};

export default DroplinkedMerch;
