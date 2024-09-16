import { Box, Flex, Button, Divider } from "@chakra-ui/react";
import { useState ,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AppShareableLink from "components/redesign/shareable-link/AppShareableLink";
import ColorCircle from "./ColorCircle";
import QRCodeComponent from "./QRCodeComponent";
import AppIcons from "assest/icon/Appicons";
import { downloadQRCode } from "./downloadQRCode";

// تعریف ثابت‌های رنگ‌ها
const WHITE_COLOR = "#FFFFFF";
const BLACK_COLOR = "#000000";

type CircleColor = typeof WHITE_COLOR | typeof BLACK_COLOR;

interface PaymentLinkContentProps {
  id: string; // prop `id` برای ساخت لینک
}

const PaymentLinkContent: React.FC<PaymentLinkContentProps> = ({ id }) => {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null); 
  const navigate = useNavigate(); 
  const [selectedColor, setSelectedColor] = useState<CircleColor>(WHITE_COLOR); // رنگ پیش‌فرض سفید
  // ساخت لینک محصول با استفاده از `id`
  const productLink = `https://droplinked.io/bedi/product/${id}`;

  const handleNavigateSettings = () => {
    navigate('/dashboard/settings/payment-link-design'); // ناوبری به مسیر در همان تب
  };




  const handleDownloadClick = () => {
    downloadQRCode(qrCodeContainerRef, 'qrcode.png'); // استفاده از تابع دانلود
  };

  // تابع تغییر رنگ
  const toggleColor = () => {
    setSelectedColor((prevColor) =>
      prevColor === WHITE_COLOR ? BLACK_COLOR : WHITE_COLOR
    );
  };

  return (
    <Box width="100%" bg="#292929" padding="32px">
      {/* بخش بالایی: QR کد و دکمه های حالت نمایش */}
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="300px"
        mb="24px"
      >
        <QRCodeComponent ref={qrCodeContainerRef} link={productLink} color={selectedColor} />

        {/* دکمه‌های جابجایی */}
        <Flex gap="8px">
          <ColorCircle
            color={WHITE_COLOR}
            isActive={selectedColor === WHITE_COLOR} // تشخیص بر اساس رنگ انتخاب شده
            onClick={toggleColor} // تابع تغییر رنگ
          />
          <ColorCircle
            color={BLACK_COLOR}
            isActive={selectedColor === BLACK_COLOR} // تشخیص بر اساس رنگ انتخاب شده
            onClick={toggleColor} // تابع تغییر رنگ
          />
        </Flex>
      </Flex>

      <Box borderRadius="12px" border="1px solid #292929" bg="#141414">
        {/* بخش بالایی با پدینگ */}
        <Box padding="32px">
          <AppShareableLink link={productLink} buttonBgColor="#2BCFA1" />
        </Box>

        {/* خط جداکننده */}
        <Divider borderColor="#292929" />

        {/* بخش پایینی با دکمه‌ها */}
        <Flex paddingY="24px" paddingX="32px" justifyContent="space-between">
          <Button
            leftIcon={<AppIcons.SettingIcon width={20} height={20} />}
            color="#FFF"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap="8px"
            onClick={handleNavigateSettings}
          >
            Configure
          </Button>
          <Button
          sx={{ "svg path": { stroke: "#2BCFA1" } }}
            leftIcon={<AppIcons.Download width={20} height={20} />}
            color="#2BCFA1"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap="8px"
            onClick={handleDownloadClick}
          >
            Download QR Code
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PaymentLinkContent;
