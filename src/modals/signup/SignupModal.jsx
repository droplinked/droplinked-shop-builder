import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SignupProducer from "./signup-producer/SignupProducer";
import SignupCustomer from "./signup-customer/SignupCustomer";

import { Box } from "@chakra-ui/react";
import { Title } from "./SignupModal-style";
import { useParams } from "react-router-dom";

const SignupModal = ({ show, close, switchToggle, shopname }) => {
  const params = useParams();

  return (
    <ModalWrapper close={close} show={show}>
      <Box w="100%" h="100%">
        <Title>Create a free account</Title>
        {params.shopname != undefined ? (
          <SignupCustomer close={close} switchToggle={switchToggle} />
        ) : (
          <SignupProducer
            close={close}
            shopname={shopname}
            switchToggle={switchToggle}
          />
        )}
      </Box>
    </ModalWrapper>
  );
};

export default SignupModal;
