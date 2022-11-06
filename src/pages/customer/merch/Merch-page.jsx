//import "./Merch-page-style.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../api/public/Product-api";
import { MerchpageContainer } from "./Merch-page-style";
import { Box } from "@chakra-ui/react";

import Loading from "../../../components/shared/loading/Loading";
import DroplinkedMerch from "./droplinked-merch/Droplinked-merch";
import ShopifyMech from "./shopify-merch/Shopify-merch";
import LoginModal from "../../../components/Modal/Login/login-modal";
import SignUpModal from "../../../components/Modal/Register-modal/SignUpModal";
import ResetPassModal from "../../../components/Modal/ResetPass-modal/ResetPassModal-component";

export default function MerchPage() {
  const [product, setProduct] = useState(null);

  // show login modal
  const [showLogin, setLogin] = useState(false);
  // show signup modal
  const [showSignup, setShowSignup] = useState(false);
  // show reset pass modal
  const [showResetPass, setResetPass] = useState(false);

  let params = useParams();

  let merchId = params.merchId;
  let shopname = params.shopname;

  useEffect(() => {
    getdata(merchId);
  }, []);

  const getdata = async (merchId) => {
    let result = await getProduct(merchId);
    setProduct(result);
  };

  const toggleSignUp = () => setShowSignup((p) => !p);

  const toggleLogin = () => setLogin((p) => !p);

  const toggleReset = () => setResetPass((p) => !p);

  const switchModal = () => {
    toggleSignUp();
    toggleLogin();
  };

  const switchResetAndLogin = () => {
    toggleReset();
    toggleLogin();
  };

  return (
    <MerchpageContainer>
      {product == null ? (
        <Loading />
      ) : (
        <Box maxW="800px" w='100%' mx="auto">
          {product.type == "DROPLINKED" ? (
            <DroplinkedMerch product={product} openLogin={toggleLogin} />
          ) : (
            <ShopifyMech
              shopName={shopname}
              product={product}
              openLogin={toggleLogin}
            />
          )}
        </Box>
      )}
      {showSignup && (
        <SignUpModal close={toggleSignUp} switchToggle={switchModal} />
      )}
      {showLogin && (
        <LoginModal
          close={toggleLogin}
          switchToggle={switchModal}
          switchReset={switchResetAndLogin}
        />
      )}
      {showResetPass && (
        <ResetPassModal
          backToLogin={switchResetAndLogin}
          close={() => {
            setResetPass(false);
          }}
        />
      )}
    </MerchpageContainer>
  );
}
