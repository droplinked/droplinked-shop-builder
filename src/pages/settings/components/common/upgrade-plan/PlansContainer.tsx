import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import PlanCard from './PlanCard';

interface Props {
    onOpen: () => void;
    isFetching: boolean;
}

export default function PlansContainer({ onOpen, isFetching }: Props) {
    const { t , isRTL } = useLocaleResources('settings');
    const border = "1px solid #2BCFA1";

    return (
        <Flex userSelect="none" gap="28px" flex={1} flexDirection="column">
            <PlanCard
                icon={<AppIcons.EnterprisePlan />}
                title={t("UpgradePlan.enterprise")}
                description={t("UpgradePlan.enterpriseDescription")}
                styles={{
                    filter: "blur(2px)",
                    position: "relative",
                    bottom: "1rem",
                    left: isRTL ? "0px" : "15rem",
                    right: isRTL ? "15rem" : "0px",
                    width: "100%",
                    gap: 4,
                    border: "1px solid #333",
                    borderRadius: "16px",
                    background: "#222",
                    padding: "16px",
                    zIndex: -1,
                }}
            />
            <Flex
                width="100%"
                gap={4}
                borderTop={border}
                borderLeft={isRTL ? "0px" : border}
                borderRight={isRTL ? border : "0px"}
                borderBottom={border}
                borderLeftRadius={isRTL ? "0px" : "16px"}
                borderRightRadius={isRTL ? "16px" : "0px"}
                background="#2BCEA11A"
                alignItems="center"
                justifyContent="space-between"
                p={4}
            >
                <Flex gap={4} alignItems="center">
                    <Box height={"min-content"} bg="#2BCEA11A" p={2} borderRadius="8px">
                        <AppIcons.PremiumPlan color="#fff" />
                    </Box>
                    <Flex flexDir="column">
                        <AppTypography color="#fff" fontSize="18px" fontWeight={700}>
                            {t("UpgradePlan.premium")}
                        </AppTypography>
                        <AppTypography color="#B1B1B1" fontSize="14px" fontWeight={400}>
                            {t("UpgradePlan.premiumDescription")}
                        </AppTypography>
                    </Flex>
                </Flex>
                <AppButton onClick={onOpen} isLoading={isFetching}>
                    {t("UpgradePlan.unlockFeatures")}
                </AppButton>
            </Flex> 
            <PlanCard
                icon={<AppIcons.StarOutline style={{ width: "27px", height: "27px" }} />}
                title={t("UpgradePlan.proPlan")}
                description={t("UpgradePlan.proDescription")}
                styles={{
                    filter: "blur(2px)",
                    position: "relative",
                    top: "1rem",
                    right: isRTL ? "15rem" : "0px",
                    left: isRTL ? "0px" : "15rem",
                    width: "100%",
                    gap: 4,
                    border: "1px solid #333",
                    borderRadius: "16px",
                    background: "#222",
                    padding: "16px",
                    zIndex: -1,
                }}
            />
        </Flex>
    );
}
