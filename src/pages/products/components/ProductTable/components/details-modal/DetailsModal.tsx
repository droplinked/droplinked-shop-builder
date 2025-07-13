import { Box, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useState } from "react";
import TabButtons from "../common/TabButtons";
import OrdersContent from "./components/order/OrdersContent";
import ProductInfoContent from "./components/ProductInfoContent";

const TABS = {
  PRODUCT_INFO: "PRODUCT_INFO",
  ORDERS: "ORDERS",
};

interface IProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

function DetailsModal({ product, isOpen, onClose }: IProps) {
  const { t } = useLocaleResources('products')
  const [activeTab, setActiveTab] = useState(TABS.PRODUCT_INFO);

  const handleTabChange = (tabName: string) => setActiveTab(tabName);

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.PRODUCT_INFO:
        return <ProductInfoContent product={product} />;
      case TABS.ORDERS:
        return <OrdersContent productId={product._id} />;
      default:
        return <ProductInfoContent product={product} />;
    }
  };

  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: "xl",
        scrollBehavior: "inside",
        isCentered: true
      }}
      modalContentProps={{ width: "100%", padding: "0px !important", overflow: "hidden" }}
    >
      <ModalBody padding="0px !important">
        <Box pt="48px" pb="0px">
          <ModalHeaderData
            title={t('detailsModal.title')}
            description={t('detailsModal.description')}
          />
          <Box mb="24px" />
          <TabButtons 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            tabs={[
              { name: TABS.PRODUCT_INFO, label: t('detailsModal.productInfo') },
              { name: TABS.ORDERS, label: t('detailsModal.orders') }
            ]} 
          />
        </Box>
        {renderTabContent()}
      </ModalBody>
    </AppModal>
  );
}

export default DetailsModal;
