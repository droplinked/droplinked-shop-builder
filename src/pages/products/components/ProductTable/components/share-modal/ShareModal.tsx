import { Box, ModalBody } from "@chakra-ui/react";
import AppModal from "components/redesign/modal/AppModal";
import React, { useState } from "react";
import DirectLinkContent from "./parts/DirectLinkContent";
import Header from "./parts/Header";
import PaymentLinkContent from "./parts/PaymentLinkContent";
import ProductTileContent from "./parts/ProductTileContent";
import SocialTileContent from "./parts/SocialTileContent";
import TabButtons from "./parts/TabButtons";
import { transformProductData } from "./productUtils";
import TABS from "./tabsConstants"; // وارد کردن مقادیر ثابت از فایل جدید

interface IProps {
  close: () => void;
  open: boolean;
  product: any; // این نوع داده باید به نوع داده صحیح تغییر کند
}

function ProductShareModal({ close, open, product }: IProps) {
  const [activeTab, setActiveTab] = useState(TABS.DIRECT_LINK);
  // استفاده از تابع transformProductData برای تبدیل داده‌های ورودی
  const transformedProduct = transformProductData(product);

  if (!transformedProduct) return <></>; // نمایش پیام اگر داده محصول موجود نبود

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
        isOpen: open,
        onClose: close,
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
          <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
        </Box>
        {renderTabContent()}
      </ModalBody>
    </AppModal>
  );
}

export default ProductShareModal;
