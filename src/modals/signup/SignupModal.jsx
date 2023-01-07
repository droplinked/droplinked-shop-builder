import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SignupProducer from "./signup-producer/SignupProducer";
import SignupCustomer from "./signup-customer/SignupCustomer";

import { Box } from "@chakra-ui/react";
import { Title } from "./SignupModal-style";
import { useParams } from "react-router-dom";

const SignupModal = ({ show, close, switchModal, shopName }) => {
  const params = useParams();

  return (
    <ModalWrapper close={close} show={show}>
      <Box w="100%" h="100%">
        <Title>Create a free account</Title>
        {params.shopName != undefined ? (
          <SignupCustomer close={close} switchToggle={switchModal} />
        ) : (
          <SignupProducer
            close={close}
            shopname={shopName}
            switchToggle={switchModal}
          />
        )}
      </Box>
    </ModalWrapper>
  );
};

export default SignupModal;
