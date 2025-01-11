import { Box, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import React from "react";
import DropInfoContent from "./components/DropInfoContent";
import Header from "./components/Header";

interface IProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  transactionHash?: string
}

function DropInfoModal({ product, isOpen, onClose, transactionHash }: IProps) {
  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: "xl",
        scrollBehavior: "outside",
        isCentered: true,
      }}
      modalContentProps={{
        width: "100%",
        padding: "0px !important",
        overflow: "hidden",
      }}
    >
      <ModalBody padding="0px !important">
        <Box pt="48px" pb="36px" bg="#141414">
          <Header product={product} />
        </Box>
        <DropInfoContent product={product} />
      </ModalBody>
    </AppModal>
  );
}

export default DropInfoModal;
