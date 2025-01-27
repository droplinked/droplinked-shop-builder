import { ModalBody } from "@chakra-ui/react"
import AppModal from "components/redesign/modal/AppModal"
import React from "react"
import ModalContent from "./ModalContent"
import ModalHeader from "./ModalHeader"

interface IProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

function DropInfoModal({ product, isOpen, onClose }: IProps) {
  return (
    <AppModal
      modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
      modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0 }}
    >
      <ModalHeader product={product} />

      <ModalBody padding="48px !important">
        <ModalContent product={product} />
      </ModalBody>
    </AppModal>
  )
}

export default DropInfoModal