// import { useState } from "react";
// import { Box } from "@chakra-ui/react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCart } from "../../../context/cart/CartContext";
// import {
//   CheckoutPageWrapper,
//   EmptyText,
//   PriceWrapper,
//   PriceText,
//   ButtonWrapper,
// } from "./Checkout-page-style";
// import { SHOP_TYPES } from "../../../constant/shop-types";
// import { getTotalPrice } from "./checkout-utils";
// import { useSelector, useDispatch } from "react-redux";
// import { selectCurrentProfile } from "../../../store/profile/profile.selector";
// import { setCurrentUser } from "../../../store/profile/profile.action";
// import { signinViaHirowallet } from "../../../utils/hirowallet/hirowallet-utils";

// import BasicButton from "../../../components/shared/BasicButton/BasicButton";
// import EmailModal from "../../../modals/email/EmailModal";
// import DroplinkedItem from "./chekout-item/Droplinked-item";
// import ShopifytItem from "./chekout-item/Shopify-item";
// import AuthModal from "../../../modals/auth/AuthModal";

// function CheckoutPage() {
//   const [showEmailModal, setShowEmailModal] = useState(false);
//   const [modal, setModdal] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const profile = useSelector(selectCurrentProfile);
//   const { cart } = useCart();
//   const { shopname } = useParams();

//   const addUser = (data) => dispatch(setCurrentUser(data));

//   const signInWallet = () => signinViaHirowallet(profile, addUser);

//   const closeEmailModal = () => setShowEmailModal(false);

//   const toggleModal = () => setModdal((p) => !p);

//   const isLogin = () => {
//     let checkResult = true;

//     const isGated = cart.items.find((item) => item.productRule != undefined);

//     if (!profile) {
//       if (isGated) signInWallet();
//       else toggleModal();
//       checkResult = false;
//     } else if (!profile.email) {
//       setShowEmailModal(true);
//       checkResult = false;
//     }

//     return checkResult;
//   };

//   const checkoutSubmit = () => {
//     if (!isLogin()) return;

//     navigate(`/${shopname}/address`);
//   };

//   const checkGated = (rule) => {
//     if (rule == undefined) {
//       return null;
//     } else {
//       if (!profile) return true;
//       else return false;
//     }
//   };

//   const currentShop = JSON.parse(localStorage.getItem("currentShop"));
//   const backToShop = () => navigate(`/${currentShop}`);

//   return (
//     <CheckoutPageWrapper>
//       {cart == null ? (
//         <EmptyText>Empty</EmptyText>
//       ) : (
//         <>
//           <Box bgColor="button" borderRadius="8px">
//             {cart.items.map((item, i) => (
//               <>
//                 {cart.type == SHOP_TYPES.SHOPIFY ? (
//                   <ShopifytItem
//                     product={item.product}
//                     lock={checkGated(item.productRule)}
//                     variant={item.variant}
//                     amount={item.amount}
//                   />
//                 ) : (
//                   <DroplinkedItem
//                     product={item.product}
//                     sku={item.sku}
//                     lock={checkGated(item.product.ruleset)}
//                     quantity={item.quantity}
//                     shopName={item.shopName}
//                   />
//                 )}
//                 {i != cart.items.length - 1 && (
//                   <Box w="100%" px="16px">
//                     <Box w="100%" borderBottom="2px solid #757575"></Box>
//                   </Box>
//                 )}
//               </>
//             ))}
//           </Box>

//           <PriceWrapper>
//             <Box>
//               <PriceText>Total price: ${getTotalPrice(cart)}</PriceText>
//             </Box>
//           </PriceWrapper>

//           <ButtonWrapper>
//             <Box w={{ base: "150px", md: "200px" }} overflow="hidden">
//               <BasicButton click={backToShop} cancelType={true}>
//                 Back to shop
//               </BasicButton>
//             </Box>

//             <Box w={{ base: "150px", md: "200px" }} overflow="hidden">
//               <BasicButton click={checkoutSubmit}>Next</BasicButton>
//             </Box>
//           </ButtonWrapper>
//         </>
//       )}
//       <EmailModal show={showEmailModal} close={closeEmailModal} />
//       <AuthModal show={modal} close={toggleModal} />
//     </CheckoutPageWrapper>
//   );
// }

// export default CheckoutPage;
