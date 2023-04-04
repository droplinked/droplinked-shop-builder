// import {
//   ViewCollectionPageWrapper,
//   ProductWrapper,
//   CollectionTitle,
// } from "./producer-collection-style";
// import { useParams } from "react-router-dom";
// import { getCollectionById } from "../../../api-service/collections/collectionApiService";
// import { useEffect, useState } from "react";
// import { useApi } from "../../../hooks/useApi/useApi";
// import { USER_TYPE } from "../../../constant/user-types";
// import { Flex } from "@chakra-ui/react";
// import { AiFillEdit } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { selectCurrentProfile } from "../../../store/profile/profile.selector";

// import Product from "../../../components/shared/Product/Product";
// import AddProduct from "../../../components/shared/AddProduct/Add-product-component";
// import CollectionModal from "../../../modals/collection/CollectionModal";
// import Loading from "../../../components/shared/loading/Loading";

// const ProducerCollection = () => {
//   const [Collection, setCollection] = useState(null);
//   const [editCollectionModal, setEditCollectionModal] = useState(false);

//   const { collectionId } = useParams();
//   const { getApi } = useApi();
//   const profile = useSelector(selectCurrentProfile);

//   useEffect(() => {
//     getCollections();
//   }, []);

//   const getCollections = async () => {
//     let result = await getApi(getCollectionById(collectionId))
//     if(result)setCollection(result);
//   };

//   const openEditModal = () => setEditCollectionModal(true);
//   const closeEditModal = () => setEditCollectionModal(false);

//   return (
//     <ViewCollectionPageWrapper>
//       {Collection ? (
//         <>
//           <Flex alignItems="center" justifyContent="center" mb="40px">
//             <CollectionTitle>{Collection.title}</CollectionTitle>
//             <AiFillEdit
//               color="primary"
//               size="20px"
//               cursor="pointer"
//               onClick={openEditModal}
//             />
//           </Flex>

//           <ProductWrapper>
//             {Collection.products.length > 0 &&
//               Collection.products.map((product, i) => {
//                 return product.type == "SHOPIFY" ? (
//                   <div key={i} className="col-6 col-md-3 p-1">
//                     <Product
//                       title={product.shopifyData.title}
//                       imageUrl={product.shopifyData.images[0].src}
//                       id={product._id}
//                       type={USER_TYPE.PRODUCER}
//                     />
//                   </div>
//                 ) : (
//                   <div key={i} className="col-6 col-md-3 p-1">
//                     <Product
//                       title={product.title}
//                       imageUrl={product.media[0].url}
//                       id={product._id}
//                       shopname={profile.shopName}
//                       type={USER_TYPE.PRODUCER}
//                     />
//                   </div>
//                 );
//               })}
//             <div className="col-6 col-md-3 p-1">
//               <AddProduct />
//             </div>
//           </ProductWrapper>
//         </>
//       ) : (
//         <Loading />
//       )}

//       <CollectionModal
//         show={editCollectionModal}
//         collection={Collection}
//         close={closeEditModal}
//         update={getCollections}
//       />
//     </ViewCollectionPageWrapper>
//   );
// };

// export default ProducerCollection;
