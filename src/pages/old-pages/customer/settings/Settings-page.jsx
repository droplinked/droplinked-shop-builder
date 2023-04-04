// import { Flex } from "@chakra-ui/react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import {
// //   selectIsCustomer,
// //   selectIsActiveProducer,
// // } from "../../../store/profile/profile.selector";

// import AddressBookComponent from "./address-book-component/address-book-component";
// import ShopInfoComponent from "./shop-info-component/Shop-info-component";
// import PersonalInfoComponent from "./personal-info-component/Personal-info-component";
// import SettingButton from "./setting-button-component";

// export default function SettingsPage() {
//   //const isCustomer = useSelector(selectIsCustomer);
//  // const isRegisteredProducer = useSelector(selectIsActiveProducer);
//   const navigate = useNavigate();
//   // this state use for selected setting
//   const [settingComponent, setSettingComponent] = useState(
//     true ? "shop" : "personal"
//   );

//   // change state by click on buttons for change setting component used
//   //const personalSetting = () => setSettingComponent("personal");

//   const shopSetting = () => setSettingComponent("shop");

//  // const addressSetting = () => setSettingComponent("address");

//   const currentShop = JSON.parse(localStorage.getItem("currentShop"));
//   const backToShop = () => navigate(`/${currentShop}`);

//   return (
//     <Flex
//       w="100%"
//       px={{ base: "20px", md: "80px" }}
//       justifyContent="center"
//       pt="50px"
//       pb="100px"
//     >
//       <Flex
//         w="100%"
//         maxW="900px"
//         border="1px"
//         borderColor="#b3b3b3"
//         borderRadius="16px"
//         flexDirection={{ base: "column", md: "row" }}
//       >
//         <Flex
//           p="40px 10px"
//           borderBottom={{ base: "1px", md: "0px" }}
//           borderColor="white"
//           minW={{ base: "100%", md: "25%" }}
//           flexDirection="column"
//         >
//           <SettingButton click={backToShop}> Back to shop </SettingButton>
//           {/* select setting buttons  */}
//           {/* {isCustomer && (
//             <SettingButton
//               click={personalSetting}
//               active={settingComponent == "personal"}
//             >
//               {" "}
//               Personal info{" "}
//             </SettingButton>
//           )} */}

//           {true && (
//             <SettingButton
//               click={shopSetting}
//               active={settingComponent == "shop"}
//             >
//               {" "}
//               Shop info{" "}
//             </SettingButton>
//           )}
//           {/* {isCustomer && (
//             <SettingButton
//               click={addressSetting}
//               active={settingComponent == "address"}
//             >
//               Address book
//             </SettingButton>
//           )} */}
//           {/* select setting buttons  */}
//         </Flex>

//         {/* setting component  */}
//         <Flex
//           w="100%"
//           p="40px 30px"
//           justifyContent="center"
//           alignItems="center"
//           overflow="hidden"
//         >
//           {(() => {
//             switch (settingComponent) {
//               case "personal":
//                 return <PersonalInfoComponent active={settingComponent} />;
//               case "shop":
//                 return <ShopInfoComponent active={settingComponent} />;
//               case "address":
//                 return <AddressBookComponent active={settingComponent} />;
//             }
//           })()}
//         </Flex>
//         {/* setting component  */}
//       </Flex>
//     </Flex>
//   );
// }
