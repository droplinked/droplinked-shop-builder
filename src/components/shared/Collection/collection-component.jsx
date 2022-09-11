import { useNavigate, useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../../../api/BaseUrl";
import IframeSnipped from "../../Modal/Iframe-snipped-modal/Iframe-snipped-modal";
import CollectionHeader from "./collection-header-component";
import CollectionProducts from "./collection-products-component";
// collection format : {
//     ._id: id
//     products:[]
//     title : string
// }

export default function Collection({ collection, shopname, type }) {
  // state for open and close snipped modal
  const [snippedModal, setSnippedModal] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  // collection iframe code
  let iframeCode = `<iframe  
    style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
            scrolling="no"
                title='product'
                src='${window.location.origin}/collection-iframe/${param.shopname}/${collection._id}'
                allowFullScreeng
            />`;

  const link = ` ${BASE_URL}/public/collection/${collection._id}`;

  // opent collection page
  const seeMore = () => {
    navigate(`/${shopname}/collection/${collection._id}`);
  };

  const openSnipedModal = () => {
    setSnippedModal(true);
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        w="100%"
        maxW="750px"
        mb={{ base: "20px", md: "30px" }}
        p="10px 10px 0px 10px"
      >
        {/* head */}
        <CollectionHeader
          title={collection.title}
          openSnipedModal={openSnipedModal}
          seeMore={seeMore}
        />
        {/* head */}
        {/* content */}
        <CollectionProducts
          products={collection.products}
          shopname={shopname}
          type={type}
        />
        {/* content */}
      </Flex>
      {snippedModal && (
        <IframeSnipped
          link={link}
          code={iframeCode}
          close={() => {
            setSnippedModal(false);
          }}
        />
      )}
    </>
  );
}
