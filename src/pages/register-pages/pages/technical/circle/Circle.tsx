import { Box, Image, Input, Link, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import useAppStore from "lib/stores/app/appStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import CircleManage from "./CircleManage";

const Circle = () => {
  const { shop, user } = useAppStore(), manageModal = useDisclosure(), navigate = useNavigate();
  return !shop?.circleWallets?.length ? <Button onClick={() => navigate("/analytics/registration")}>Activate Merchant Wallet</Button> : (
    <Box display="flex" width="full" alignItems="center" borderRadius="8px" background="#1C1C1C">
      <Image src="https://upload-file-droplinked.s3.amazonaws.com/0ed7113f38aa1fdd77fef89b65c1928a0d265d9fc8aa26d57bc7424344bd1bf8.png" width="320px" height="full" objectFit="cover" />
      <Box display="flex" padding="36px" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="8px" flex="1 0 0">
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="36px" alignSelf="stretch">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="16px" alignSelf="stretch">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                <AppTypography color="#FFF" alignSelf="stretch" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">Merchant Wallet</AppTypography>
                <AppTypography color="#7B7B7B" alignSelf="stretch" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">Activate the merchant wallet by Circle to enable USDC acceptance. Circle's programmable wallet offers a secure and seamless way to manage revenue while minimizing merchant processing fees.</AppTypography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap="36px" alignSelf="stretch">
                {[["CircleShield", "Secure"], ["CircleDashboard", "Instant Access"], ["CircleRefresh", "Automatic Conversion"]].map(([Icon, text]) => {
                  // const LabelIcon = AppIcons[Icon]
                  return (
                    <Box key={text} display="flex" alignItems="center" gap="8px">
                      <Box display="flex" padding="8px" justifyContent="center" alignItems="center" gap="8px" borderRadius="50px" background="rgba(43, 207, 161, 0.10)">
                        {/* <LabelIcon /> */}
                      </Box>
                      <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">{text}</AppTypography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box display="flex" height="48px" alignItems="flex-start" gap="16px" alignSelf="stretch" position="relative">
              <Box display="flex" alignItems="flex-start" flex="1 0 0">
                <Box display="flex" padding="12px 16px" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px" border="1px solid #3C3C3C">
                  <Input display="-webkit-box" style={{ WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }} color="#BCBCBC" textOverflow="ellipsis" padding="0px" height="auto" border="none" focusBorderColor="transparent" fontFamily="Inter" fontSize="16px" fontWeight="400" value={shop?.circleWallets?.find(cw => cw?.chain === "ETH")?.address || ""} />
                  <AppIcons.CircleCopy cursor="pointer" onClick={() => navigator.clipboard.writeText(shop?.circleWallets?.find(cw => cw?.chain === "ETH")?.address || "")} />
                </Box>
                <Box display="flex" padding="0px 4px" justifyContent="center" alignItems="center" gap="4px" position="absolute" left="12px" top="-8px" borderRadius="4px" background="#1C1C1C">
                  <AppTypography color="#FFF" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">Wallet Address</AppTypography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-start" gap="16px">
            <Button color="black" fontSize="14px" onClick={manageModal.onOpen}>Manage Wallet</Button>
            <Link alignSelf="stretch" href="https://www.binance.com/en/crypto/buy" target="_blank">
              <Button display="flex" border="none" color="#FFF" textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="16px" padding="12px 16px" justifyContent="center" alignItems="center" gap="6px" borderRadius="8px" background="#262626">Charge Wallet</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <CircleManage {...manageModal} />
    </Box>
  );
};

export default Circle;
