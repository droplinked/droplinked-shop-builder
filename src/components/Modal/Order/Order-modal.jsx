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
import { updateOrderStatus } from "../../../api/producer/Orders-api";
import { ORDER_TYPES } from "../../../constant/order.types";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useOrder } from "../../../context/order/OrdersContext";
import { SHOP_TYPES } from "../../../constant/shop-types";

import OrderMerch from "./Order-merch-component";
import OrderStatus from "./Order-status-component";
import OrderAddress from "./Order-address-component";
import YesNoModal from "../YesOrNo/YesOrNo-modal-component";

export default function OrderModal({ order, isOpen, onClose }) {

  // this state use for loading stauts
  const [loadingBtn, setLoadingBtn] = useState(false);
  // this state use for show proccessModal
  const [proccessModal, setProccessModal] = useState(false);
  // this state use for show cancelOrderModal
  const [cancelOrderModal, setCancelOrderModal] = useState(false);

  const { successToast, errorToast } = useToasty();
  const { updateOrder } = useOrder();


  const progressClick = async () => {
    let statusType =
      order.status == "WAITING_FOR_CONFIRMATION"
        ? ORDER_TYPES.PROCESSING
        : ORDER_TYPES.SENT;
    setLoadingBtn(true);
    let result = await updateOrderStatus(order._id, statusType);
    setLoadingBtn(false);
    if (result == true) {
      successToast("Status changed successfully");
      updateOrder();
    } else {
      errorToast(result);
    }
    closeSmallModal();
  };

  const cancelOrder = async () => {
    setLoadingBtn(true);
    let result = await updateOrderStatus(order._id, ORDER_TYPES.CANCELED);
    setLoadingBtn(false);
    if (result == true) {
      successToast("You canceled the order");
      updateOrder();
    } else {
      errorToast(result);
    }
    closeSmallModal();
  };

  const closeSmallModal = () => {
    setProccessModal(false);
    setCancelOrderModal(false);
  };

  const cancelOnClick = () => {
    setCancelOrderModal(true);
  };

  const openProccessModal = () => {
    setProccessModal(true);
  };

  const proccessModalText = () => {
    switch (order.status) {
      case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
        return "Are you sure you want to start processing?";
      case ORDER_TYPES.PROCESSING:
        return "Are you sure you want to send this order?";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="120px" maxW="700px" w="100%" mx="20px" bgColor="#222">
        <ModalHeader
          color="#fff"
          fontSize="22px"
          fontWeight="600"
          textAlign="center"
        >
          Order
        </ModalHeader>
        <ModalCloseButton color="white" mt="10px" />
        <ModalBody>
          {/* address component */}
          {(order.type == SHOP_TYPES.DROPLINKED ) && 
            <OrderAddress address={order.customerAddressBook} /> 
          }
           

          {/* product list */}
          {order.items.map((item, i) => {
            return (
              <Box key={i} mb="20px">
                <OrderMerch item={item} type={order.type} />
              </Box>
            );
          })}
        </ModalBody>

        <ModalFooter>
          <OrderStatus
            orderStatus={order.status}
            loading={loadingBtn}
            cancelOnClick={cancelOnClick}
            openProccessModal={openProccessModal}
          />
        </ModalFooter>
      </ModalContent>
      {/* process modal */}

      {proccessModal && (
        <YesNoModal
          show={proccessModal}
          hide={closeSmallModal}
          text={proccessModalText()}
          click={progressClick}
          loading={loadingBtn}
        />
      )}

      {/* cancel order modal */}

      {cancelOrderModal && (
        <YesNoModal
          show={cancelOrderModal}
          hide={closeSmallModal}
          text={"Are you sure you want to cancel this order?"}
          click={cancelOrder}
        />
      )}
    </Modal>
  );
}
