import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../../../../context/cart/CartContext";
import {
  checkoutCart,
  checkoutFree,
} from "../../../../../api/base-user/Cart-api";
import { getUserAddress } from "../../../../../services/wallet-auth/api";
import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import {
  getClientSecret,
  CanselOrder,
} from "../../../../../api/base-user/OrderHistory-api";

import StripeComponent from "./stripe modal/stripe-modal-component";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export default function ImsPayment({ totalPrice }) {

  const [paymentSelected, setPaymentSelected] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [disableBtns, setDisables] = useState(false);
  // ............................  //
  const { errorToast } = useToasty();
  const { cart, updateCart } = useCart();
  const { userData } = UseWalletInfo();

  let navigate = useNavigate();
  var lastOrder = JSON.parse(sessionStorage.getItem("payOrder"));
  // redirect from this page if cart and lastOrder be empty
  if (cart && cart.items.length == 0 && lastOrder == null) {
    navigate("/purchseHistory?redirect_status=failed");
  }

  // stripe component style
  const appearance = {
    theme: "night",
    labels: "floating",
  };
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance,
  };

  const cancelPayment = async () => {
    if (lastOrder) {
      await CanselOrder(lastOrder._id);
      sessionStorage.removeItem("payOrder");
    } else {
      await checkoutCart();
      updateCart();
    }
    navigate("/purchseHistory?redirect_status=failed");
  };

  const stripePayment = async () => {
    let walletAddress = userData ? getUserAddress(userData).mainnet : "";
    setDisables(true);
    let result;
    if (lastOrder != null) {
      result = await getClientSecret(lastOrder._id);
    } else {
      result = await checkoutCart(walletAddress);
    }

    if (result != null) {
      setClientSecret(result);
      setPaymentSelected("Stripe");
      setTimeout(cancelPayment, 300000);
    }
    setDisables(false);
  };

  const confirmOrder = async () => {
    let walletAddress = userData ? getUserAddress(userData).mainnet : "";
    setDisables(true);
    let result = await checkoutFree(walletAddress);
    if (result == true) navigate(`/purchseHistory?redirect_status=succeeded`);
    else errorToast(result);
    setDisables(false);
  };

  return (
    <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>
      <Box
        display="flex"
        wrap="wrap"
        row-gap="10px"
        w="100%"
        flexDirection="column"
      >
        <Box w="100%" p="10px 5px">
          <Box
            w="100%"
            display="flex"
            height={{ base: "100px", md: "auto" }}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              w="40%"
              color="primary"
              border="1px"
              borderColor="primary"
              bgColor="#222"
              _hover={{
                color: "#222",
                borderColor: "#222",
                bgColor: "primary",
              }}
              disabled={disableBtns}
              onClick={totalPrice == 0 ? confirmOrder : stripePayment}
            >
              {totalPrice == 0
                ? "Confirm"
                : `${disableBtns ? "Wait" : "Credit card"}`}
            </Button>

            <Button
              w="40%"
              color="primary"
              border="1px"
              borderColor="primary"
              bgColor="#222"
              _hover={{
                color: "#222",
                borderColor: "#222",
                bgColor: "primary",
              }}
              disabled={true}
            >
              Crypto payment
            </Button>
          </Box>
        </Box>
      </Box>

      {paymentSelected == "Stripe" && (
        <Elements stripe={stripePromise} options={options}>
          <StripeComponent
            cancel={() => {
              cancelPayment();
            }}
          />
        </Elements>
      )}
    </Box>
  );
}
