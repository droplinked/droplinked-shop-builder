import SignupProducer from "./signup-producer/SignupProducer";
import { Flex, Stack } from "@chakra-ui/react";
import AppTypography from 'components/common/typography/AppTypography';
import AppModal from 'components/common/modal/AppModal';

const SignupModal = ({ show, close, switchModal, shopName }) => {
  return (
    <AppModal open={show} close={close} title="Sign Up">
      <Stack w="100%" h="100%" spacing="20px">
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
