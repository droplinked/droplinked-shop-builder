// GrowthHackModal.js
import { Box, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import useGrowthHackStore from "lib/stores/growth-hack/useGrowthHackStore";
import React, { useEffect } from "react";
import { growth_hack_constants } from "./dashboard.layout.constants";
import DashboardLayoutSidebarGrowthHackModal from "./DashboardLayoutSidebarGrowthHackModal";

const DashboardLayoutSidebarGrowthHack = () => {
    const [currentSection, setCurrentSection] = React.useState(0);
    const [currentSubSection, setCurrentSubSection] = React.useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { growthHackData, isLoading, fetchGrowthHackData } = useGrowthHackStore();
    useEffect(() => {
        (async () => {
            !growthHackData && !isLoading && (await fetchGrowthHackData());
        })();
    }, [growthHackData]);
    return (
        <Box
            padding="16px"
            backgroundImage="https://upload-file-droplinked.s3.amazonaws.com/080341fb6bfdf0e5084f501bfe84500e33e709679e2b0a9aa573b2903010829d.png"
            backgroundSize="cover"
            backgroundPosition="center"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="16px"
            borderRadius="12px"
            border="1px solid #292929"
            display="flex"
        >
            <Box display="flex" width="32px" height="32px" padding="8px" justifyContent="center" alignItems="center">
                <AppIcons.SidebarAnalytics width="16px" height="16px" />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px">
                    Level Up
                </AppTypography>
                <AppTypography color="#FFF" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">
                    Take meaningful actions to drive your business forward and unlock new opportunities.
                </AppTypography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch" borderRadius="8px" border="1px solid #3C3C3C">
                {!isLoading &&
                    growth_hack_constants?.map((section, index) => {
                        const isCompleted = growthHackData?.list?.[section?.objectField] || false;
                        return (
                            <Box
                                key={index}
                                display="flex"
                                padding="12px"
                                alignItems="center"
                                gap="12px"
                                alignSelf="stretch"
                                onClick={() => {
                                    setCurrentSection(index);
                                    setCurrentSubSection(0);
                                    onOpen();
                                }}
                                width="100%"
                                cursor="pointer"
                            >
                                {isCompleted ? <AppIcons.SidebarTickedCircle width="16px" height="16px" /> : <AppIcons.SidebarCircle width="16px" height="16px" />}
                                <AppTypography
                                    align="left"
                                    width="full"
                                    flex="1 0 0"
                                    color="#FFF"
                                    fontFamily="Inter"
                                    fontSize="12px"
                                    fontStyle="normal"
                                    fontWeight="500"
                                    lineHeight="16px"
                                    {...(isCompleted && { color: "#2BCFA1", textDecoration: "line-through" })}
                                >
                                    {section?.title}
                                </AppTypography>
                                <AppIcons.SidebarChevronright />
                            </Box>
                        );
                    })}
            </Box>
            <DashboardLayoutSidebarGrowthHackModal
                section={growth_hack_constants[currentSection]}
                currentSubSection={currentSubSection}
                setCurrentSubSection={setCurrentSubSection}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    );
};

export default DashboardLayoutSidebarGrowthHack;
