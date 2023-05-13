import ModalWrapper from "../modal-wrapper/ModalWrapper";
import SignupProducer from "./signup-producer/SignupProducer";

import { Flex, Stack } from "@chakra-ui/react";
import { Title } from "./SignupModal-style";
import AppTypography from "components/shared/typography/AppTypography";

const SignupModal = ({ show, close, switchModal, shopName }) => {
  return (
    <ModalWrapper close={close} show={show}>
      <Stack w="100%" h="100%" spacing="20px">
        <Flex justifyContent={"center"} marginBottom={5}>
          <AppTypography size="18px" color={"#FFF"} weight="bolder">Sign Up</AppTypography>
        </Flex>
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
