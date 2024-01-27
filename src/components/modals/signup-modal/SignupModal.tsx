import { Stack } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';
import React from "react";
import SignupProducer from "./signup-producer/SignupProducer";

interface Props {
  show: boolean;
  close: Function;
  switchToLogin: Function;
  shopName: string
}

const SignupModal = ({ show, close, switchToLogin, shopName }: Props) => {
  return (
    <AppModal open={show} close={close} title="Sign Up">
      <Stack w="100%" h="100%" spacing="20px">
        <SignupProducer
          close={close}
          shopname={shopName}
          switchToLogin={switchToLogin}
        />
      </Stack>
    </AppModal>
  );
};

export default SignupModal;
