//import "../Merch-page-style.scss";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { useProfile } from "../../../../context/profile/ProfileContext";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { checkRules } from "../../../../services/nft-service/NFTcheck";
import { useCart } from "../../../../context/cart/CartContext";
import { addSkuToCart } from "../../../../api/base-user/Cart-api";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  ReadmoreIconWrapper,
  DescriptionTextWrapper,
} from "../styles/Merch-style";
import { isGated } from "../../../../utils/gated.utils/gated-utils";
import { FiArrowDownCircle } from "react-icons/fi";

import Carousel from "../../../../components/shared/Carousel/Carousel-component";
import DroplinkedDetail from "./Droplinked-merch-detail";

const DroplinkedMerch = ({ product , openLogin}) => {
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

  // add to baskset functionality
  const Addtobasket = async () => {
    // if (userData == undefined) {
    //   authenticate();
    //   return;
    // }

    if (profile == null) {
      if (isGated(product.ruleset)) signinWithaWallet()
      else openLogin()
     // signinWithaWallet();
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

    if (product.ruleset == undefined) {
      await addMerhcToCart(cart);
      return;
    }

    if (userData == undefined) {
      signinWithaWallet();
      return;
    }

    const Rules = product.ruleset.rules.map((rule) => rule.address);

    setDisableBtn(true);
    checkRules(userData.profile.stxAddress.mainnet, Rules)
      .then(async (e) => {
        if (e) {
          await addMerhcToCart(cart);
        } else {
          setDisableBtn(false);
          errorToast("Required NFT not found, accessed denied");
        }
      })
      .catch((e) => {
        setDisableBtn(false);
        errorToast(e.response.data);
      });
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
      <Box w={{ base: "100%", md: "50%" }} minh="500px">
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
