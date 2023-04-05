// import { useNavigate, useParams } from "react-router-dom";
// import { Flex, Box } from "@chakra-ui/react";
// import { useState } from "react";
// import { BASE_URL } from "../../../api/BaseUrl";
// import { CollectionWrapper } from "./collection-component-style";

// import IframeModal from "../../../modals/iframe/IframeModal";
// import CollectionHeader from "./collection-header-component";
// import CollectionProducts from "./collection-products-component";
// import Countdown from "./countdown-component/countdown-component";
// // collection format : {
// //     ._id: id
// //     products:[]
// //     title : string
// // }

// export default function Collection({ collection, shopname, type }) {
//   // state for open and close snipped modal
//   const [snippedModal, setSnippedModal] = useState(false);
//   const param = useParams();
//   const navigate = useNavigate();

//   let event = collection.title == "Holder merchandise";

//   // collection iframe code
//   let iframeCode = `<iframe  
//     style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
//             scrolling="no"
//                 title='product'
//                 src='${window.location.origin}/collection-iframe/${param.shopname}/${collection._id}'
//                 allowFullScreeng
//             />`;

//   const link = ` ${BASE_URL}/public/collection/${collection._id}`;

//   // opent collection page
//   const seeMore = () => {
//     navigate(`/${shopname}/collection/${collection._id}`);
//   };

//   const openSnipedModal = () => {
//     setSnippedModal(true);
//   };

//   return (
//     <>
//       <CollectionWrapper>
//         {/* head */}
//         <CollectionHeader
//           title={collection.title}
//           openSnipedModal={openSnipedModal}
//           seeMore={seeMore}
//         />
//         {/* head */}

//         {/* content */}
//         {/* <Box w="100%">
//           <CollectionProducts
//             products={collection.products}
//             shopname={shopname}
//             type={type}
//           />
//         </Box> */}

//         {event == true ? (
//           <Flex w="100%" flexDir={{ base: "column", md: "row" }}>
//             <Box w={{ base: "100%", md: "50%" }}>
//               <CollectionProducts
//                 products={collection.products}
//                 shopname={shopname}
//                 type={type}
//                 event={true}
//               />
//             </Box>
//             <Box w={{ base: "100%", md: "50%" }} py='10px'>
//               <Countdown />
//             </Box>
//           </Flex>
//         ) : (
//           <Box w="100%">
//             <CollectionProducts
//               products={collection.products}
//               shopname={shopname}
//               type={type}
//               event={false}
//             />
//           </Box>
//         )}

//         {/* content */}
//       </CollectionWrapper>

//       <IframeModal
//         show={snippedModal}
//         link={link}
//         code={iframeCode}
//         close={() => {
//           setSnippedModal(false);
//         }}
//       />
//     </>
//   );
// }
