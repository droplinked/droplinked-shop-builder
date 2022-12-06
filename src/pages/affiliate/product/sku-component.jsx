import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

import RequestModal from "../../../components/Modal/request/request-modal";

const SkuComponent = ({ sku }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((p) => !p);

  return (
    <>
      <Flex
        w="100%"
        py="16px"
        borderBottom="1px solid"
        borderColor="line"
        mb="18px"
        justifyContent="space-between"
      >
        <Flex
          w="100%"
          border="1px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="14px" fontWeight="400" color="white">
            {sku.options.variantName}: {sku.options.value}
          </Text>
          <Box border="1px solid" borderColor="line" w="1px" h="100%"></Box>
          <Text fontSize="14px" fontWeight="400" color="white">
            Price: ${sku.price}
          </Text>
          <Box border="1px solid" borderColor="line" w="1px" h="100%"></Box>
          <Text fontSize="14px" fontWeight="400" color="white">
            Quantity: {sku.quantity}
          </Text>
          <Box border="1px solid" borderColor="line" w="1px" h="100%"></Box>
          <Text fontSize="14px" fontWeight="400" color="white">
            External ID: {sku.externalId}
          </Text>
          <Box border="1px solid" borderColor="line" w="1px" h="100%"></Box>
          <Text fontSize="14px" fontWeight="400" color="white">
            DBD: {sku.dbd.length}*{sku.dbd.width}*{sku.dbd.height}
          </Text>
          <Box border="1px solid" borderColor="line" w="1px" h="100%"></Box>
          <Text fontSize="14px" fontWeight="400" color="white">
            Weight: {sku.Weight}
          </Text>
        </Flex>

        <Button
          p="8px 24px"
          fontSize="18px"
          fontWeight="500"
          bg="primary"
          borderRaduis="8px"
          ml="15%"
          _hover={{
            bg: "primary",
            border: "none",
            outline: "none",
            color: "white",
          }}
          onClick={toggleModal}
        >
          Request
        </Button>
      </Flex>
      {showModal && <RequestModal close={toggleModal} />}
    </>
  );
};

export default SkuComponent;
