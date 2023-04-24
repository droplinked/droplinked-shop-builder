import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";


import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";
import OrderDetailComponent from "./components/order-detail-component/OrderDetailComponent";
import orderModalContext from "./context";

export default function OrderModal({ updateOrder, order, show, close }) {

  return (
    <orderModalContext.Provider value={{ order }}>
      <Modal isOpen={show} onClose={close}>
        <ModalOverlay />
        <ModalContent mt="120px" maxW="1000px" w="100%" mx="20px" bgColor="#222">
          <ModalBody p={{ base: "20px", sm: "60px 80px" }} borderRadius="8px">
            <CustomerInformationComponent />
            <Box mb="64px" />
            <OrderDetailComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </orderModalContext.Provider>
  );
}
