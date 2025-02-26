import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppShareableLink from "components/redesign/shareable-link/AppShareableLink";
import { SHOP_URL } from "utils/app/variable";
import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ColorCircle from "./ColorCircle";
import { downloadQRCode } from "./downloadQRCode";
import QRCodeComponent from "./QRCodeComponent";

const WHITE_COLOR = "#FFFFFF";
const BLACK_COLOR = "#000000";

type CircleColor = typeof WHITE_COLOR | typeof BLACK_COLOR;

interface PaymentLinkContentProps {
  id: string; 
}

const PaymentLinkContent: React.FC<PaymentLinkContentProps> = ({ id }) => {
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<CircleColor>(WHITE_COLOR); 
  const productLink = `${SHOP_URL}/paylink/product/${id}`;

  const handleNavigateSettings = () => {
    navigate('/analytics/settings/payment-link-design'); 
  };

  const handleDownloadClick = () => downloadQRCode(qrCodeContainerRef, 'qrcode.png'); 

  const toggleColor = () => {
    setSelectedColor((prevColor) =>
      prevColor === WHITE_COLOR ? BLACK_COLOR : WHITE_COLOR
    );
  };

  return (
    <Box width="100%" bg="#292929" padding="32px">
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="auto"
        mb="24px"
        py='24px'
      >
        <QRCodeComponent ref={qrCodeContainerRef} link={productLink} color={selectedColor} />

\
        <Flex gap="8px">
          <ColorCircle
            color={WHITE_COLOR}
            isActive={selectedColor === WHITE_COLOR} 
            onClick={toggleColor}
          />
          <ColorCircle
            color={BLACK_COLOR}
            isActive={selectedColor === BLACK_COLOR} 
            onClick={toggleColor}
          />
        </Flex>
      </Flex>

      <Box borderRadius="12px" border="1px solid #292929" bg="#141414">
        <Box padding="32px">
          <AppShareableLink link={productLink} buttonBgColor="#2BCFA1" />
        </Box>

        <Divider borderColor="#292929" />

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
