import { Flex, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import React from "react";
import ProPlanCard from "./ProPlanCard";
import ProPlanFooter from "./ProPlanFooter";
import ProPlanHeader from "./ProPlanHeader";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  unlockedMonths: number;
}

const ProPlanUpgradeModal = ({ isOpen, onClose, unlockedMonths }: Props) => {
  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: "2xl",
        isCentered: true,
        closeOnOverlayClick: false,
      }}
      modalContentProps={{
        width: "600px !important",
        maxWidth: "600px !important",
        padding: "0px !important",
      }}
    >
      <ModalBody
        bg="url('https://upload-file-droplinked.s3.amazonaws.com/2abc65781b927044e61acccfd9eef90eca030be153053f7c2722c66a86938fcb.png')"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="0px !important"
        rounded="16px"
      >
        <Flex gap="48px" flexDirection="column" paddingInline="48px" paddingTop="48px">
          <ProPlanHeader unlockedMonths={unlockedMonths} />
          <ProPlanCard unlockedMonths={unlockedMonths} />
        </Flex>
        <ProPlanFooter />
      </ModalBody>
    </AppModal>
  );
};

export default ProPlanUpgradeModal;
