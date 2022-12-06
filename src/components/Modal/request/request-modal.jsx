import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

import ModalContainer from "../modal-container/modal-container";
import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

const RequestModal = ({ close }) => {

  const [commision, setCommision] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const changeCommision = (e) => setCommision(e.target.value)
  const changeQuantity = (e) => setQuantity(e.target.value)


  const sendRequest = async() => {
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      close()
    }, 2000);

  }

  return (
    <ModalContainer close={close}>
      <Text fontSize="20px" fontWeight="400" color="white" textAlign='center'>
        Lorem ipsum dolor sit amet consectetur. Laoreet consequat praesent nibh
        ut urna orci arcu varius. Sed dictum donec ornare bibendum bibendum
        massa euismod nunc. Integer felis at vel et auctor tellus mauris quisque
        quis. Scelerisque feugiat cursus sed turpis tempus.
      </Text>
      <Box mb='36px'></Box>
      <FormInput
          label="Commission"
          placeholder="Commission"
          value={commision}
          changeValue={changeCommision}
          type="number"
        />
         <Box mb='18px'></Box>
         <FormInput
          label="quantity"
          placeholder="quantity"
          value={quantity}
          changeValue={changeQuantity}
          type="number"
        />
           <Box mb='36px'></Box>
           <Box w='100%'><BasicButton click={sendRequest} loading={loading}>Request</BasicButton></Box>
    </ModalContainer>
  );
};

export default RequestModal;
