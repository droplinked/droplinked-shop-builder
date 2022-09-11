import "../Merch-page-style.scss";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UseWalletInfo } from "../../../context/wallet/WalletContext";
import { useProfile } from "../../../context/profile/ProfileContext";
import { useToasty } from "../../../context/toastify/ToastContext";
import { checkRules } from "../../../services/nft-service/NFTcheck";
import { useCart } from "../../../context/cart/CartContext";
import { addSkuToCart } from "../../../api/base-user/Cart-api";
import {
  MerchPageWrapper,
  DescriptionWrapper,
  DescriptionText,
  ReadmoreButton,
} from "../styles/Merch-style";

import Carousel from "../../../components/shared/Carousel/Carousel-component";
import DroplinkedDetail from "./Droplinked-merch-detail";

const DroplinkedMerch = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  const [textLimit, setTextLimit] = useState(false);


  const [selectedSku, setSelectedSku] = useState(null);

  const { userData, authenticate } = UseWalletInfo();
  const { profile } = useProfile();
  const { errorToast, successToast } = useToasty();
  const { updateCart } = useCart();

  let params = useParams();
  let shopname = params.shopname;

  let images = product.media;

  // add to baskset functionality
  const Addtobasket = async () => {
   

    if (profile == null) {
      errorToast("Please login");
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
      authenticate();
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
        <DescriptionText
          display={textLimit == true ? "inline-block " : "-webkit-box"}
        >
          {product.description}
        </DescriptionText>
        <ReadmoreButton
          className="merch-readmore-button"
          onClick={changeTextLimit}
        >
          Read more
        </ReadmoreButton>
      </DescriptionWrapper>
      {/* description */}
    </MerchPageWrapper>
  );
};

export default DroplinkedMerch;
