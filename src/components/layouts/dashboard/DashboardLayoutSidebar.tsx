import React, { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { sidebar_constants } from "./dashboard.layout.constants";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import DashboardLayoutSidebarItem from "./DashboardLayoutSidebarItem";
import { Link } from "react-router-dom";


const DashboardLayoutSidebar = () => {
    const [openList, setOpenList] = useState(null);
    return (
        <Flex width="288px" height="full" padding="28px 16px 24px 16px" flexDirection="column" alignItems="flex-start" gap="24px" position="sticky" top={0}>
            <Link to={"/dashboard"}>
                <Box display="flex" width="257px" alignItems="center" gap="24px" cursor={"pointer"}>
                    <AppIcons.SidebarDroplinked width="32px" height="32px" />
                    <Image src="https://upload-file-droplinked.s3.amazonaws.com/b9214ede097ce79176231d6eff27af5ed52081ad4bd33e35cc4e42e7e78ba6cf.png" width="127px" height="24px" flexShrink="0" />
                </Box>
            </Link>
            <Box display="flex" padding="36px 0px" flexDirection="column" alignItems="flex-start" gap="24px" flex="1 0 0" alignSelf="stretch">
                {sidebar_constants?.map((sidebar_group) => (
                    <Box key={sidebar_group.group} display="flex" flexDirection="column" alignItems="flex-start" gap="8px" alignSelf="stretch">
                        <Flex display="flex" height="16px" paddingLeft="12px" alignItems="center" gap="10px" alignSelf="stretch">
                            <AppTypography color="#7B7B7B" fontFamily="Inter" fontSize="10px" fontWeight="400" lineHeight="16px">{sidebar_group.group}</AppTypography>
                        </Flex>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                            {sidebar_group?.items?.map((item) => (<DashboardLayoutSidebarItem key={item?.title} item={item} isExpanded={openList === item?.title} toggleExpanded={() => setOpenList(openList === item?.title ? null : item?.title)} />))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default DashboardLayoutSidebar