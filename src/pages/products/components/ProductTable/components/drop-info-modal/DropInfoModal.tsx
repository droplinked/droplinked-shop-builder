import { Box, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import React from "react";
import DropInfoContent from "./components/DropInfoContent";
import Header from "./components/Header";

interface IProps {
  close: () => void;
  open: boolean;
  product: any;
}

function DropInfoModal({ close, open, product }: IProps) {
  return (
    <AppModal
      modalRootProps={{
        isOpen: open,
        onClose: close,
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
