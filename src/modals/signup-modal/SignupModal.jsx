import SignupProducer from "./signup-producer/SignupProducer";
import { Flex, Stack } from "@chakra-ui/react";
import AppTypography from "common/typography/AppTypography";
import AppModal from "common/modal/AppModal";

const SignupModal = ({ show, close, switchModal, shopName }) => {
  return (
    <AppModal open={show} close={close} contentProps={{ padding: "50px 30px" }}>
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
    </AppModal>
  );
};

export default SignupModal;
