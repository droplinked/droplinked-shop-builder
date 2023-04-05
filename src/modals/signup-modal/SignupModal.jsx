import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SignupProducer from "./signup-producer/SignupProducer";

import { Box } from "@chakra-ui/react";
import { Title } from "./SignupModal-style";


const SignupModal = ({ show, close, switchModal, shopName }) => {

  return (
    <ModalWrapper close={close} show={show}>
      <Box w="100%" h="100%">
        <Title>Create a free account</Title>
        <SignupProducer
          close={close}
          shopname={shopName}
          switchToggle={switchModal}
        />
      </Box>
    </ModalWrapper>
  );
};

export default SignupModal;

{
  /* {params.shopName != undefined ? (
          <SignupCustomer close={close} switchToggle={switchModal} />
        ) : (
          <SignupProducer
            close={close}
            shopname={shopName}
            switchToggle={switchModal}
          />
        )} */
}
