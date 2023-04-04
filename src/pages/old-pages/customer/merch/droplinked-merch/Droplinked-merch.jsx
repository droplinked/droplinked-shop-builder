//import "../Merch-page-style.scss";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
//import { GATED_TYPE } from "../../../../constant/gated-status-type";
//import { isGated } from "../../../../utils/gated.utils/gated-utils";
import { FiArrowDownCircle } from "react-icons/fi";
import {
  getMaxDiscount,
  gatedPassesRules,
} from "../../../../services/check-rule-service/check-rule";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentProfile,
} from "../../../../store/profile/profile.selector";
import { selectHiroWalletData } from "../../../../store/hiro-wallet/hiro-wallet.selector";
import { setCurrentUser } from "../../../../store/profile/profile.action";
import { signinViaHirowallet } from "../../../../utils/hirowallet/hirowallet-utils";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import DroplinkedDetail from "./Droplinked-merch-detail";

const DroplinkedMerch = ({ bproduct, openLogin }) => {
  const [product, setProduct] = useState(bproduct);
  const [quantity, setQuantity] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  const [textLimit, setTextLimit] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
  const [lock, setLock] = useState(true);

  const dispatch = useDispatch();
 // const { userData } = UseWalletInfo();
  const userData = useSelector(selectHiroWalletData);
  const profile = useSelector(selectCurrentProfile);
  const { errorToast, successToast } = useToasty();
  const { updateCart } = useCart();
  const params = useParams();
  // const findGatedStatus = () => {
  //   if(product.ruleset == undefined) return "PUBLIC"
  //   else {
  //     if(product.ruleset.gated) return "GATED"
  //     else return "DISCOUNT"
  //   }
  // }
  const gatedStatus =
  (product.ruleset == undefined || product.ruleset.rules.length == 0 )
      ? "PUBLIC"
      : product.ruleset.gated
      ? "GATED"
      : "DISCOUNT";
  const isGated = product.ruleset == undefined ? false : true;

  let shopname = params.shopname;
  let images = product.media;

  const addUser = (data) =>  dispatch(setCurrentUser(data)) 

  const signInWallet = () =>  signinViaHirowallet(profile, addUser);

  useEffect(() => {
    if (gatedStatus != "PUBLIC" && userData) checkProductRule();
  }, [userData]);

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
        discountSkus(result.discountPercentage);
        setLock(false);
      }
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
      if (isGated) signInWallet();
      else openLogin();
      return;
    }

    if (userData == undefined && isGated) {
      signInWallet();
      return;
    }

    if (quantity == 0) {
      errorToast("Please add items");
      return;
    }

    if (gatedStatus == "GATED") {
      if (!lock) addMerhcToCart();
      else errorToast("Required NFT not found, accessed denied");
    } else {
      addMerhcToCart();
    }
  };

  const addMerhcToCart = async () => {
    const cart = {
      skuID: selectedSku._id,
      quantity: quantity,
    };

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
        rule={product.ruleset}
        lock={lock}
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
