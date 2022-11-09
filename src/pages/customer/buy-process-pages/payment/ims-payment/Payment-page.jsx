import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../../../../context/cart/CartContext";
import { checkoutCart } from "../../../../../api/base-user/Cart-api";
import { getUserAddress } from "../../../../../services/wallet-auth/api";
import { UseWalletInfo } from "../../../../../context/wallet/WalletContext";
//import { STRIPE_KEY } from "./stripe.key";
//import { addRootpaymentOrder } from "../../../api/base-user/Cart-api"
import { useNavigate } from "react-router-dom";
import {
  getClientSecret,
  CanselOrder,
} from "../../../../../api/base-user/OrderHistory-api";
 // getUserAddress(userData).mainnet
// import axios from "axios"
import StripeComponent from "./stripe modal/stripe-modal-component";
//import Loading from "../../../../../components/shared/loading/Loading";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export default function ImsPayment() {
  // const [rootpaymentsOrderID, setRootpaymentsOrderID] = useState(null);
  const [paymentSelected, setPaymentSelected] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [disableBtns, setDisables] = useState(false);

  const { cart, updateCart } = useCart();
  const { userData } = UseWalletInfo();
  let navigate = useNavigate();
  var lastOrder = JSON.parse(sessionStorage.getItem("payOrder"));
  // console.log(lastOrder);
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
  // stripe component style

  // get total cost of merchs
  // const getTotalofMerchs = () => {
  //     let merchsPrice = 0;
  //     // map on all cart items and get total price of each item
  //     cart.items.forEach((item) => {
  //         merchsPrice += parseFloat(item.totalPrice)
  //     })
  //     return merchsPrice
  // }

  // find all shop's name and build unique array and set $5 for each shop
  // const getTotalofShipping = () => {
  //     let price =  parseFloat(cart.selectedEasyPostShipmentRate)
  //    return price
  // }

  // const getTotalCost = () => {
  //     return  ((getTotalofShipping()) + (getTotalofMerchs())).toFixed(2)
  // }

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
    let walletAddress = (userData)?getUserAddress(userData).mainnet:''
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

  // const rootpaymentListener = (orderId) => {
  //     setInterval(function () {
  //         axios.get(`https://api.staging.rootpayments.com/orders/${orderId}`)
  //             .then(e => {
  //                 if (e.data.data.status == 'paid') {
  //                     navigate("/purchseHistory?redirect_status=succeeded")
  //                 }
  //                 console.log(e.data.data.status)
  //             })
  //     }, 10000);
  // }

  // const rootpaymentsPayment = async () => {
  //     setDisables(true) //Don't know what that is, copied from stripe

  //     const ROOTPAYMENTS_API = 'https://api.staging.rootpayments.com';
  //     const ROOTPAYMENTS_INTEGRATION_ID = '87f9faf7-816f-44e9-bfa5-a2b7d5d78ee2'; // Replace with your integration ID

  //     //Create RootPayments order
  //     await axios.post(`${ROOTPAYMENTS_API}/orders`, {
  //         "amount": {
  //             "amount": (getTotalCost()),
  //             "currency": "USD"
  //         },
  //         "token": "stx", //mia or stx - depends on Integration configuration
  //         "integration_id": ROOTPAYMENTS_INTEGRATION_ID,
  //         "callback_url": `https://dev-api.droplinked.com/webhook/root-payments/order` // Replace with your callback URL - this should point to your backend API that handles order statuses. Note the order=${cart.id} parameter in the callback URL (so that you can identify the order by its ID)
  //     }, {}).then(e => {
  //         addRootpaymentOrder(e.data.data.id)
  //         setRootpaymentsOrderID(e.data.data.id);
  //         rootpaymentListener(e.data.data.id)
  //     }).catch(e => {
  //         console.log(e)
  //     })
  //     setDisables(false)//Don't know what that is, copied from stripe
  // }

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
              onClick={stripePayment}
            >
              Credit card
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
              //  onClick={rootpaymentsPayment}
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
