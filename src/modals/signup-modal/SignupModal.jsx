import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SignupProducer from "./signup-producer/SignupProducer";

import { Stack } from "@chakra-ui/react";
import { Title } from "./SignupModal-style";

const SignupModal = ({ show, close, switchModal, shopName }) => {
  return (
    <ModalWrapper close={close} show={show}>
      <Stack w="100%" h="100%" spacing="20px">
        <Title>Sign Up</Title>
        <SignupProducer
          close={close}
          shopname={shopName}
          switchToggle={switchModal}
        />
      </Stack>
    </ModalWrapper>
  );
};

export default SignupModal;
