import React from "react";
import { Box, Divider, Image, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppTooltip from "components/common/tooltip/AppTooltip";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import useAppStore from "lib/stores/app/appStore";
import { appVersion } from "lib/utils/app/variable";
import { createProfileConstants } from "./dashboard.layout.constants";
import DashboardLayoutDecideFragmentOrLink from "./DashboardLayoutDecideBoxOrLink";

const DashboardLayoutHeader = ({ subscriptionInfo: { icon: SubscriptionIcon, title: subscriptionTitle, rightSide: subscriptionRightSide } }) => {
    const { logoutUser } = useProfile();
    const { shop, user } = useAppStore();
    const profileConstants = createProfileConstants(shop, logoutUser);
    return (
        <Box display="flex" width="full" padding="16px 36px 16px 24px" justifyContent="flex-end" alignItems="center" gap="16px" position="sticky" top={0} borderBottom="1px solid #292929" zIndex="999" backgroundColor="#141414">
            <AppTypography flex="1 0 0" color="#FFF" fontFamily="Inter" fontSize="20px" fontWeight="700" lineHeight="32px">Page Title</AppTypography>
            <Menu variant="unstyled">
                <MenuButton cursor="pointer" display="flex" padding="14px" justifyContent="center" alignItems="center" gap="4px" borderRadius="8px" border="1px solid #3C3C3C" background="#1C1C1C"><AppIcons.SidebarUser width="20px" height="20px" /></MenuButton>
                <MenuList right="32px" borderRadius="8px" background="#222" border="none" width="352px" boxShadow="0px 4px 6px -4px rgba(23, 34, 62, 0.08), 0px 8px 12px -6px rgba(23, 34, 62, 0.08)">
                    <MenuList right={"32px"} borderRadius="8px" background="#222" border={"none"} width="352px" boxShadow="0px 4px 6px -4px rgba(23, 34, 62, 0.08), 0px 8px 12px -6px rgba(23, 34, 62, 0.08)">
                        <Box gap="16px" width={"full"} display="flex" padding="24px" flexDirection="column" justifyContent="center" alignItems="flex-start">
                            <Box display="flex" alignItems="center" gap="16px" width={"full"} alignSelf={"stretch"}>
                                <Image width={"48px"} height={"48px"} src={shop?.logo} borderRadius="full" objectFit={"contain"} backgroundPosition={"center"} />
                                <Box display="flex" alignSelf={"stretch"} flexDirection="column" justifyContent="center" alignItems="flex-start" flex="1 0 0">
                                    <AppTypography alignSelf={"stretch"} color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="600" lineHeight="24px">{user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : "Welcome"}</AppTypography>
                                    <AppTypography alignSelf={"stretch"} color="#C4C4C4" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="400" lineHeight="16px">{shop.description.length <= 15 ? shop.description : <AppTooltip label={shop?.description}>{`${shop?.description.slice(0, 15)}...`}</AppTooltip>}</AppTypography>
                                </Box>
                                <Link to={"/shop-management"}><AppIcons.ProfileSwitch width={"20px"} height={"20px"} /></Link>
                            </Box>
                            <Divider display="flex" flexDirection="column" alignItems="flex-start" gap="10px" alignSelf="stretch" height={"1px"} borderColor={"#292929"} />
                            <Box display="flex" padding="0px 16px" alignItems="center" gap="4px" alignSelf="stretch">
                                <Box display="flex" alignItems="center" gap="12px" flex="1 0 0">
                                    <SubscriptionIcon width={"20px"} height={"20px"} color="white" />
                                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">{subscriptionTitle}</AppTypography>
                                </Box>
                                <Box {...subscriptionRightSide?.style}>{subscriptionRightSide?.value}</Box>
                            </Box>
                            <Divider display="flex" flexDirection="column" alignItems="flex-start" gap="10px" alignSelf="stretch" height={"1px"} borderColor={"#292929"} />
                            <Box display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch">
                                {profileConstants?.map((profile_list) => (
                                    <DashboardLayoutDecideFragmentOrLink key={profile_list?.title?.label} isExternalLink={profile_list?.isExternalLink} linkTo={profile_list?.linkTo}>
                                        <Box display="flex" height="52px" padding="16px" justifyContent="center" alignItems="center" gap="12px" alignSelf="stretch" cursor={profile_list?.linkTo && "pointer"}>
                                            <profile_list.icon.svg width={"20px"} height={"20px"} {...profile_list?.title?.style} />
                                            <AppTypography color="#FFF" flex="1 0 0" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px" {...profile_list?.title.style}>{profile_list?.title?.label}</AppTypography>
                                            {profile_list?.rightSide?.value && <Box {...profile_list?.rightSide?.style}>{profile_list?.rightSide?.value}</Box>}
                                        </Box>
                                    </DashboardLayoutDecideFragmentOrLink>
                                ))}
                            </Box>
                            <Divider display="flex" flexDirection="column" alignItems="flex-start" gap="10px" alignSelf="stretch" height={"1px"} borderColor={"#292929"} />
                            <Box display="flex" padding="0px 16px" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                                <AppTypography color="#7B7B7B" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">Version</AppTypography>
                                <AppTypography color="#7B7B7B" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">{appVersion}</AppTypography>
                            </Box>
                        </Box>
                    </MenuList>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default DashboardLayoutHeader
