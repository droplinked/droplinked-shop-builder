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
import { transformProductData } from "./productUtils";

interface IProps {
  close: () => void;
  open: boolean;
  product: any; // این نوع داده باید به نوع داده صحیح تغییر کند
}

function ProductShareModal({ close, open,  product }: IProps) {
  const [activeTab, setActiveTab] = useState(TABS.DIRECT_LINK);
  console.log('product ', product)
  // استفاده از تابع transformProductData برای تبدیل داده‌های ورودی
  const transformedProduct = transformProductData(product);

  if (!transformedProduct) {
    return <></>; // نمایش پیام اگر داده محصول موجود نبود
  }
console.log('transformedProduct ', transformedProduct)
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.DIRECT_LINK:
        return <DirectLinkContent product={transformedProduct} />;
      case TABS.PAYMENT_LINK:
        return <PaymentLinkContent id={transformedProduct.id} />;
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
        product={transformedProduct}
      />
      <Box mb="24px" />
      <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
      {renderTabContent()}
    </AppModal>
  );
}

export default ProductShareModal;
