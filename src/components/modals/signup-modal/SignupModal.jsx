import SignupProducer from "./signup-producer/SignupProducer";
import { Flex, Stack } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';

const SignupModal = ({ show, close, switchModal, shopName, isFromPlansPage, subscriptionPlan }) => {
  return (
    <AppModal open={show} close={close} title="Sign Up">
      <Stack w="100%" h="100%" spacing="20px">
        <SignupProducer
          close={close}
          shopname={shopName}
          switchToggle={switchModal}
          isFromPlansPage={isFromPlansPage}
          subscriptionPlan={subscriptionPlan}
        />
      </Stack>
    </AppModal>
  );
};

export default SignupModal;
