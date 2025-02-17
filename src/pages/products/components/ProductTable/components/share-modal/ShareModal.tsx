import { Box, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import React, { useState } from "react";
import TabButtons from "../common/TabButtons";
import DirectLinkContent from "./components/DirectLinkContent";
import Header from "./components/Header";
import PaymentLinkContent from "./components/PaymentLinkContent";
import ProductTileContent from "./components/ProductTileContent";
import SocialTileContent from "./components/SocialTileContent";
import { transformProductData } from "./productUtils";
import TABS from "./tabsConstants";

interface IProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

function ProductShareModal({ product, isOpen, onClose }: IProps) {
  const [activeTab, setActiveTab] = useState(TABS.DIRECT_LINK);
  const transformedProduct = transformProductData(product);

  if (!transformedProduct) return <></>;

  const handleTabChange = (tabName: string) => setActiveTab(tabName);

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.DIRECT_LINK:
        return <DirectLinkContent product={transformedProduct} />;
      case TABS.PAYMENT_LINK:
        return <PaymentLinkContent id={transformedProduct.id} />;
      case TABS.PRODUCT_TILE:
        return (
          <ProductTileContent productTile={transformedProduct.productTile} />
        );
      case TABS.SOCIAL_TILE:
        return <SocialTileContent />;
      default:
        return <DirectLinkContent product={transformedProduct} />;
    }
  };

  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: "xl",
        scrollBehavior: "outside",
        isCentered: true
      }}
      modalContentProps={{ width: "100%", padding: "0px !important", overflow: "hidden" }}
    >
      <ModalBody padding="0px !important">
        <Box pt="48px" pr="48px" pl="48px" pb="0px">
          <Header product={transformedProduct} />
          <Box mb="24px" />
          <TabButtons activeTab={activeTab} onTabChange={handleTabChange} tabs={Object.keys(TABS).map(key => ({ name: TABS[key] }))} />
        </Box>
        {renderTabContent()}
      </ModalBody>
    </AppModal>
  );
}

export default ProductShareModal;
