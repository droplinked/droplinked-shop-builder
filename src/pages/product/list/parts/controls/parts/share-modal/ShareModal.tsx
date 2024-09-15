import { useState } from "react";
import AppModal, { IAppModal } from "components/common/modal/AppModal";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Header from "./parts/Header";
import TabButtons from "./parts/TabButtons";
import DirectLinkContent from "./parts/DirectLinkContent";
import PaymentLinkContent from "./parts/PaymentLinkContent";
import ProductTileContent from "./parts/ProductTileContent";
import SocialTileContent from "./parts/SocialTileContent";
import TABS from "./tabsConstants"; // وارد کردن مقادیر ثابت از فایل جدید

interface IProps {
  close: () => void;
  open: boolean;
  productId: string;
}

function ProductShareModal({ close, open, productId }: IProps) {
  const [activeTab, setActiveTab] = useState(TABS.DIRECT_LINK);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.DIRECT_LINK:
        return <DirectLinkContent />;
      case TABS.PAYMENT_LINK:
        return <PaymentLinkContent />;
      case TABS.PRODUCT_TILE:
        return <ProductTileContent />;
      case TABS.SOCIAL_TILE:
        return <SocialTileContent />;
      default:
        return <DirectLinkContent />;
    }
  };
  return (
    <AppModal close={close} open={open} size="2xl">
      <Header
        productImage="https://upload-file-droplinked.s3.amazonaws.com/original/1726323378519-unisex-lightweight-t-shirt-black-front-66e59aa6bb75a.png"
        productTitle="test"
        productPrice="100usd"
      />
      <Box mb="24px" />
      <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
      {renderTabContent()}
    </AppModal>
  );
}

export default ProductShareModal;
