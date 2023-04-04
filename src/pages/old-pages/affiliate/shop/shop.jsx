// import { Box, Flex, Image, Text } from "@chakra-ui/react";
// import { shopsData } from "../shops/shops-data";

// import instaIcon from "../../../assest/icon/insta.png";
// import discordIcon from "../../../assest/icon/newdiscord.png";
// import twitterIcon from "../../../assest/icon/twitter.png";
// import webIcon from "../../../assest/icon/web.png";

// import ProductComponent from "../components/product-component/product-component";

// const AffiliateShop = () => {
//   const dataOfShop = shopsData[0];

//   return (
//     <Box w="100%" px="36px">
//       <Flex w="100%" justifyContent="center">
//         <Flex w="auto" flexDir="column" alignItems="center">
//           <Image src={dataOfShop.logo} w="80px" h="80px" borderRadius="50%" />
//           <Box mb="16px"></Box>
//           <Text fontSize="22px" fontWeight="700" color="primary">
//             {dataOfShop.shopname}
//           </Text>
//           <Box mb="16px"></Box>
//           <Text fontSize="14px" fontWeight="500" color="white">
//             {dataOfShop.description}
//           </Text>
//           <Box mb="16px"></Box>
//           <Flex columnGap="12px">
//             <Image
//               src={instaIcon}
//               href={`https://www.instagram.com/${dataOfShop.instagramUrl}`}
//               w="16px"
//               h="16px"
//               cursor="pointer"
//             />
//             <Image
//               src={discordIcon}
//               href={`https://discord.gg/${dataOfShop.discordUrl}`}
//               w="16px"
//               h="16px"
//               cursor="pointer"
//             />
//             <Image
//               src={twitterIcon}
//               href={`https://twitter.com/${dataOfShop.twitterUrl}`}
//               w="16px"
//               h="16px"
//               cursor="pointer"
//             />
//             <Image
//               src={webIcon}
//               href={`https://${dataOfShop.webUrl}`}
//               w="16px"
//               h="16px"
//               cursor="pointer"
//             />
//           </Flex>
//         </Flex>
//       </Flex>

//       <Box mb="36px"></Box>

//       <Box
//         w="100%"
//         d="grid"
//         gap="16px"
//         gridTemplateColumns={{
//           base: "repeat(2,auto)",
//           md: "repeat(3,auto)",
//           lg: "repeat(5,auto)",
//           xl: "repeat(6,auto)",
//         }}
//       >
//         {dataOfShop.products.map((product) => {
//           return <ProductComponent product={product} />;
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default AffiliateShop;
