import ProducerCollection from "../../../../components/shared/ProducerCollection/Producre-collection";

import { Flex, Box } from "@chakra-ui/react";

const OwnerShopPage = ({ shopData, shopName, update, collections }) => {

  return (
    <>
      <Flex
      // mt="40px"
        flexDir="column" alignItems="center" w="100%" 
      //px={{base:'20px' , md:'80px'}}
      >
        {collections &&
          collections.collections.map((collection) => {
            return (
              <Box w="100%" mb='40px'>
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
