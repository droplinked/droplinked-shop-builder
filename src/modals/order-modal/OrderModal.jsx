import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";
import OrderDetailComponent from "./components/order-detail-component/OrderDetailComponent";

export default function OrderModal({ updateOrder, order, show, close }) {

  return (
    <Modal isOpen={show} onClose={close}>
      <ModalOverlay />
      <ModalContent mt="120px" maxW="700px" w="100%" mx="20px" bgColor="#222">
        <ModalBody p="60px 80px" borderRadius="8px">
          <CustomerInformationComponent order={order} />
          <Box mb="64px" />
          <OrderDetailComponent order={order} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
