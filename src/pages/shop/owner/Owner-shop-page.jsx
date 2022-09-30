  import EditableTopSection from "./editable-profile-section/Editable-profile-section";
import ProducerCollection from "../../../components/shared/ProducerCollection/Producre-collection";

import { COLLECTION_TYPE } from "../../../constant/collection-types";
import { Flex, Box } from "@chakra-ui/react";

const OwnerShopPage = ({ shopData, shopName, update, collections }) => {

  return (
    <>
      <EditableTopSection shopData={shopData} shopName={shopName} />
      <Flex mt="40px" flexDir="column" alignItems="center" w="100%" px={{base:'20px' , md:'80px'}}>
        {collections &&
          collections.collections.map((collection) => {
            return (
              <Box maxW="700px" w="100%" my="20px">
                <ProducerCollection
                  key={collection._id}
                  collection={collection}
                  update={update}
                />
              </Box>
            );
          })}
      </Flex>
    </>
  );
};

export default OwnerShopPage;
