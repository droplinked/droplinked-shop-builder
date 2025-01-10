import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { sidebar_constants } from "./dashboard.layout.constants";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { Link } from "react-router-dom";
import DashboardLayoutDecideFragmentOrLink from "./DashboardLayoutDecideBoxOrLink";
import { AppAccordion, AppAccordionItem, AppAccordionTrigger, AppAccordionPanel, AppAccordionChevron } from "components/redesign/accordion/AppAccordion";
import DashboardLayoutSidebarGrowthHack from "./DashboardLayoutSidebarGrowthHack";

const DashboardLayoutSidebar = () => {
    return (
        <Flex width="288px" height="100vh" flexDirection="column" alignItems="flex-start" position="sticky" top={0}>
            <Box padding="28px 16px 24px 16px">
                <Link to={"/analytics"}>
                    <Box display="flex" width="257px" alignItems="center" gap="24px" cursor={"pointer"}>
                        <AppIcons.SidebarDroplinked width="32px" height="32px" />
                        <Image src="https://upload-file-droplinked.s3.amazonaws.com/b9214ede097ce79176231d6eff27af5ed52081ad4bd33e35cc4e42e7e78ba6cf.png" width="127px" height="24px" flexShrink="0" />
                    </Box>
                </Link>
            </Box>
            <AppAccordion multiCollapse={false} width={"full"} display="flex" padding="36px 16px" flexDirection="column" alignItems="flex-start" gap="24px" flex="1 0 0" alignSelf="stretch" overflow={"auto"}>
                {sidebar_constants?.map((sidebar_group) => (
                    <Box key={sidebar_group.group} display="flex" flexDirection="column" alignItems="flex-start" gap="8px" alignSelf="stretch" width={"full"}>
                        <Flex display="flex" height="16px" paddingLeft="12px" alignItems="center" gap="10px" alignSelf="stretch"><AppTypography color="#7B7B7B" fontFamily="Inter" fontSize="10px" fontWeight="400" lineHeight="16px">{sidebar_group.group}</AppTypography></Flex>
                        {sidebar_group?.items?.map((item) => (
                            <AppAccordionItem width={"full"} key={item?.title} itemId={item?.title} isCollapsable={item?.list?.length > 0}>
                                <AppAccordionTrigger width={"full"}>
                                    <DashboardLayoutDecideFragmentOrLink linkTo={item?.linkTo}>
                                        <Flex width={"full"} padding="12px" alignItems="center" gap="8px" alignSelf="stretch" _hover={{ backgroundColor: "#222" }} rounded="8px">
                                            <Box width="20px" height="20px"><item.icon color="white" /></Box>
                                            <AppTypography cursor="pointer" width="full" color="#FFF" fontFamily="Inter" fontSize="14px" _groupHover={{ letterSpacing: "0.2px", fontWeight: "500" }} style={{ transition: "letter-spacing .1s linear" }} fontWeight="400" lineHeight="20px">{item?.title}</AppTypography>
                                            {item?.list?.length > 0 && <AppAccordionChevron width="20px" height="20px" />}
                                        </Flex>
                                    </DashboardLayoutDecideFragmentOrLink>
                                </AppAccordionTrigger>
                                {item?.list?.length > 0 && (
                                    <AppAccordionPanel width={"full"} padding={"10px 0px 12px 20px"}>
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="12px" padding="0px 20px" flex="1 0 0" borderLeft="1px solid #3C3C3C" width={"full"}>
                                            {item?.list?.map((listItem) => <DashboardLayoutDecideFragmentOrLink key={listItem?.listTitle} linkTo={listItem?.linkTo}><AppTypography fontSize="14px" fontWeight="400" fontFamily="Inter" color="#7B7B7B" _hover={{ color: "white" }}>{listItem?.listTitle}</AppTypography></DashboardLayoutDecideFragmentOrLink>)}
                                        </Box>
                                    </AppAccordionPanel>
                                )}
                            </AppAccordionItem>
                        ))}
                    </Box>
                ))}
                <DashboardLayoutSidebarGrowthHack />
            </AppAccordion>
        </Flex>
    );
};

export default DashboardLayoutSidebar;
