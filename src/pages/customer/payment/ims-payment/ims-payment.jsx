import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../../../context/cart/CartContext";
import { API_STATUS } from "../../../../constant/api-status";
import { checkoutCart, checkoutFree } from "../../../../api/base-user/Cart-api";
import { getUserAddress } from "../../../../services/wallet-auth/api";
import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { useNavigate } from "react-router-dom";
import {
  getClientSecret,
  CanselOrder,
} from "../../../../api/base-user/OrderHistory-api";
import {
  ImsPaymentWrapper,
  ImsPaymentContainer,
  ButtonsWrapper,
  PaymetnButton,
} from "./ims-payment-style";

import SmallModal from "../../../../modals/small/SmallModal";
import StripeComponent from "./stripe modal/stripe-modal-component";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export default function ImsPayment({ totalPrice }) {
  const [paymentSelected, setPaymentSelected] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [disableBtns, setDisables] = useState(false);
  // ............................  //
  const { errorToast } = useToasty();
  const { cart, updateCart } = useCart();
  const { userData } = UseWalletInfo();

  let navigate = useNavigate();
  var lastOrder = JSON.parse(sessionStorage.getItem("payOrder"));

  if (cart && cart.items.length == 0 && lastOrder == null)
    navigate("/purchseHistory?redirect_status=failed");

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

  const openConfirmModal = () => setConfirmModal(true);
  const closeConfirmModal = () => setConfirmModal(false);

  const cancelPayment = async () => {
    if (lastOrder) {
      await CanselOrder(lastOrder._id);
      sessionStorage.removeItem("payOrder");
    } else {
      setDisables(true);
      await checkoutCart();
      setDisables(false);
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
      if (result.status == API_STATUS.SUCCESS) {
        setClientSecret(result.data);
        setPaymentSelected("Stripe");
        setTimeout(cancelPayment, 300000);
      } else {
        errorToast(result.data);
      }
    }
    setDisables(false);
  };

  const confirmOrder = async () => {
    let walletAddress = userData ? getUserAddress(userData).mainnet : "";
    setDisables(true);
    let result = await checkoutFree(walletAddress);
    setDisables(false);
    updateCart();
    if (result.status == API_STATUS.SUCCESS)
      navigate(`/purchseHistory?redirect_status=confirm`);
    else errorToast(result.data);
  };

  return (
    <ImsPaymentWrapper>
      <ImsPaymentContainer>
        <Box w="100%" p="10px 5px">
          <ButtonsWrapper>
            <PaymetnButton
              disabled={disableBtns}
              onClick={totalPrice == 0 ? openConfirmModal : stripePayment}
            >
              {totalPrice == 0
                ? "Confirm"
                : `${disableBtns ? "Wait" : "Credit card"}`}
            </PaymetnButton>

            <PaymetnButton disabled={true}>Crypto payment</PaymetnButton>
          </ButtonsWrapper>
        </Box>
      </ImsPaymentContainer>

      {paymentSelected == "Stripe" && (
        <Elements stripe={stripePromise} options={options}>
          <StripeComponent
            cancel={() => {
              cancelPayment();
            }}
          />
        </Elements>
      )}

      <SmallModal
        show={confirmModal}
        hide={closeConfirmModal}
        text={"Do you want to confirm this order?"}
        click={confirmOrder}
        loading={disableBtns}
        buttonText={"Confirm"}
      />
    </ImsPaymentWrapper>
  );
}
