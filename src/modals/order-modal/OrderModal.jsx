import { Box } from "@chakra-ui/react";
import AppModal from "components/shared/modal/AppModal";
import CustomerInformationComponent from "./components/customer-information-component/customerInformationComponent";
import OrderDetailComponent from "./components/order-detail-component/OrderDetailComponent";
import orderModalContext from "./context";

export default function OrderModal({ order, show, close }) {
  return (
    <orderModalContext.Provider value={{ order }}>
      <AppModal open={show} close={close} size="3xl" contentProps={{ padding: 12 }}>
        <CustomerInformationComponent />
        <Box mb="64px" />
        <OrderDetailComponent />
      </AppModal>
    </orderModalContext.Provider>
  );
}
