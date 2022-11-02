import ModalContainer from "../modal-container/modal-container";
import SignupProducer from "./signup producer/signup-producer-component";
import SignupCustomer from "./signup Customer/signup-customer-component";

import { Box } from "@chakra-ui/react";
import { Title } from "./singup-modal-style";
import { useParams } from "react-router-dom";

export default function SignUpModal({ close, switchToggle, shopname }) {
  // use SignupCustomer if user be in shop page show else SignupProducer
  const params = useParams();

  return (
    <ModalContainer close={close}>
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
    </ModalContainer>
  );
}
