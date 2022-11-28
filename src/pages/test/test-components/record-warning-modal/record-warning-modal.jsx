import { Box, Text, Flex } from "@chakra-ui/react";

import ModalContainer from "../../../../components/Modal/modal-container/modal-container";
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
const RecordModal = ({recordVariant ,  cancel }) => {


  const clickSubmit = () => {
    recordVariant()
    cancel()
  }
  return (
    <ModalContainer>
      <Flex alignItems="center" flexDir="column" w="100%" h="100%">
        <Text fontSize="24px" color="#FEB900" fontWeight="700">
          Warning !
        </Text>
        <Box mb="100px"></Box>
        <Text fontSize="20px" color="white" textAlign="center" fontWeight="400">
          Lorem ipsum dolor sit amet consectetur. Laoreet consequat praesent
          nibh ut urna orci arcu varius. Sed dictum donec ornare bibendum
          bibendum massa euismod nunc. Integer felis at vel et auctor tellus
          mauris quisque quis. Scelerisque feugiat cursus sed turpis tempus.
        </Text>
        <Box mb="100px"></Box>
        <Flex w="100%" justifyContent="space-between">
          <Box w="40%" maxW="200px">
            <BasicButton cancelType={true} click={cancel}>
              {" "}
              Cancel
            </BasicButton>
          </Box>
          <Box w="40%" maxW="200px">
            <BasicButton click={clickSubmit}>Record</BasicButton>
          </Box>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default RecordModal;
