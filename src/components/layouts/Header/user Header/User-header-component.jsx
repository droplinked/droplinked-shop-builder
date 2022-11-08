// import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";
// import Notification from "../icons/notification/notification-icon-component";
// import Cart from "../icons/cart/cart-icon-component";
// import newWalletIcon from "../../../../assest/icon/new-wallet-icon.svg";
// import burgerIcon from "../../../../assest/icon/burger-icon.svg";


// import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
// import { useState } from "react";
// import { Flex, Image, Box } from "@chakra-ui/react";
// import { useProfile } from "../../../../context/profile/ProfileContext";
// import { UseWalletInfo } from "../../../../context/wallet/WalletContext";
// import { useShop } from "../../../../context/shop/ShopContext";
// import {
//   UserHeaderWrapper,
//   WalletAddressText,
//   ShopnameText,
//   ProfileIconWrapper,
//   ProfileChar,
//   BurgerIcon,
// } from "./User-header-style";

// export default function UserHeader() {
//   // state for manage dropdowns

//   const [openslide, setOpenSlide] = useState(false);

  
//   const { isCustomer } = useProfile();
//   const { shop } = useShop();


 



//   const toggleSlide = () => setOpenSlide((p) => !p);

//   const { userData } = UseWalletInfo();



//   return (
//     <Flex alignItems="center" 
//    // ml={{ base: "10px", md: "15px" }}
//     >
//       {isCustomer() ? (
//         <>
//           <Cart clickBasket={openBasket} />

//           <Notification click={openNotification} />

//           <UserHeaderWrapper onClick={openProfileDropdown}>
//             <Image
//               w={{ base: "25px", md: "36px" }}
//               h={{ base: "25px", md: "36px" }}
//               src={newWalletIcon}
//             />
//             <WalletAddressText>{walletAddress()}</WalletAddressText>
//           </UserHeaderWrapper>
//         </>
//       ) : (
//         <>
//           {shop && (
//             <>
//               <Box d={{ base: "none", sm: "flex" }} alignItems="center">
//                 <ShopnameText>{shop.name}</ShopnameText>
//                 <ProfileIconWrapper>
//                   <ProfileChar>{shop.name.charAt(0).toUpperCase()}</ProfileChar>
//                 </ProfileIconWrapper>
//               </Box>
//               <BurgerIcon src={burgerIcon} onClick={toggleSlide} />
//             </>
//           )}
//         </>
//       )}
      
//     </Flex>
//   );
// }
