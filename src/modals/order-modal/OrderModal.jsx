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
import { useState } from "react";
import { putUpdateOrder } from "../../apis/orderApiService";
import { useApi } from "../../hooks/useApi/useApi";
import { ORDER_TYPES } from "../../constant/order.types";
import { useToasty } from "../../context/toastify/ToastContext";
import { SHOP_TYPES } from "../../constant/shop-types";

import OrderMerch from "./components/OrderMerch";
import OrderStatus from "./components/OrderStatus";
import OrderAddress from "./components/OrderAddress";
import SmallModal from "../../modals/small-modal/SmallModal";

import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";

export default function OrderModal({ updateOrder, order, show, close }) {
  // // this state use for loading stauts
  // const [loadingBtn, setLoadingBtn] = useState(false);
  // // this state use for show proccessModal
  // const [proccessModal, setProccessModal] = useState(false);
  // // this state use for show cancelOrderModal
  // const [cancelOrderModal, setCancelOrderModal] = useState(false);

  // const { successToast, errorToast } = useToasty();
  // const { putApi } = useApi();

  // const progressClick = async () => {
  //   let statusType =
  //     order.status === "WAITING_FOR_CONFIRMATION"
  //       ? ORDER_TYPES.PROCESSING
  //       : ORDER_TYPES.SENT;
  //   setLoadingBtn(true);
  //   let result = await putApi(putUpdateOrder(order._id, statusType));
  //   setLoadingBtn(false);
  //   if (result === true) {
  //     successToast("Status changed successfully");
  //     updateOrder();
  //   } else {
  //     errorToast(result);
  //   }
  //   closeSmallModal();
  // };

  // const cancelOrder = async () => {
  //   setLoadingBtn(true);
  //   let result = await putApi(putUpdateOrder(order._id, ORDER_TYPES.CANCELED));
  //   setLoadingBtn(false);
  //   if (result === true) {
  //     successToast("You canceled the order");
  //     updateOrder();
  //   } else {
  //     errorToast(result);
  //   }
  //   closeSmallModal();
  // };

  // const closeSmallModal = () => {
  //   setProccessModal(false);
  //   setCancelOrderModal(false);
  // };

  // const cancelOnClick = () => {
  //   setCancelOrderModal(true);
  // };

  // const openProccessModal = () => {
  //   setProccessModal(true);
  // };

  // const proccessModalText = () => {
  //   switch (order.status) {
  //     case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
  //       return "Are you sure you want to start processing?";
  //     case ORDER_TYPES.PROCESSING:
  //       return "Are you sure you want to send this order?";
  //   }
  // };

  return (
    <Modal isOpen={show} onClose={close}>
      <ModalOverlay />
      <ModalContent mt="120px" maxW="700px" w="100%" mx="20px" bgColor="#222">
        <ModalBody p="60px 80px" borderRadius="8px">
          <CustomerInformationComponent order={order} />
        </ModalBody>
        {/* <ModalHeader
          color="white"
          fontSize="22px"
          fontWeight="600"
          textAlign="center"
        >
          Order
        </ModalHeader>
        <ModalCloseButton color="white" mt="10px" />
        <ModalBody>

          {order.type != SHOP_TYPES.SHOPIFY && (
            <OrderAddress address={order.customerAddressBook} />
          )}


          {order.items.map((item, i) => {
            return (
              <Box key={i} mb="20px">
                <OrderMerch item={item} type={order.type} />
              </Box>
            );
          })}
        </ModalBody>

        <ModalFooter></ModalFooter> */}
      </ModalContent>

      {/* <SmallModal
        show={proccessModal}
        hide={closeSmallModal}
        text={proccessModalText()}
        click={progressClick}
        loading={loadingBtn}
        buttonText="Yes"
      />

      <SmallModal
        show={cancelOrderModal}
        hide={closeSmallModal}
        text={"Are you sure you want to cancel this order?"}
        click={cancelOrder}
        loading={loadingBtn}
        buttonText="Yes"
      /> */}
    </Modal>
  );
}
