import { Box } from "@chakra-ui/react";
import AppModal from 'components/common/modal/AppModal';
import BlockChainOrderModal from "./components/blockchain/BlockChainOrderModal";
import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";
import OrderDetailComponent from "./components/order-detail-component/OrderDetailComponent";
import orderModalContext from "./context";

export default function OrderModal({ order, show, close }) {
  return (
    <orderModalContext.Provider value={{ order }}>
      <AppModal open={show} isCentered={false} close={close} size="3xl" contentProps={{ padding: 9 }}>
        <CustomerInformationComponent />
        <Box mb="34px" />
        <OrderDetailComponent />
        <Box mb="34px" />
        <BlockChainOrderModal />
      </AppModal>
    </orderModalContext.Provider>
  );
}
