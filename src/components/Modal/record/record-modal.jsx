import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

import ModalContainer from "../modal-container/modal-container";
import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

const RecordModal = ({ close , submit , loading}) => {
    
  const [commision, setCommision] = useState("");

  const changeCommision = (e) => setCommision(e.target.value);

   // const submit = () => {};

  return (
    <ModalContainer close={close}>
      <Flex flexDir="column" alignItems="center">
        <Text fontWeight="700" fontSize="24px" color="#FEB900" mb="36px">
          Warning !
        </Text>
        <FormInput
          label="Commission"
          placeholder="Commission"
          value={commision}
          changeValue={changeCommision}
          type="number"
        />
        <Box mb="36px"></Box>
        <Text fontSize="20px" fontWeight="400" color="white" textAlign="center">
          Lorem ipsum dolor sit amet consectetur. Laoreet consequat praesent
          nibh ut urna orci arcu varius. Sed dictum donec ornare bibendum
          bibendum massa euismod nunc. Integer felis at vel et auctor tellus
          mauris quisque quis. Scelerisque feugiat cursus sed turpis tempus.
        </Text>
        <Box mb="36px"></Box>
        <Flex w="100%" justifyContent="space-between">
          <Box w="45%">
            <BasicButton cancelType={true} click={close} disable={loading}>
              Cancel
            </BasicButton>
          </Box>

          <Box w="45%">
            <BasicButton click={submit} loading={loading}>Record</BasicButton>
          </Box>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default RecordModal;
