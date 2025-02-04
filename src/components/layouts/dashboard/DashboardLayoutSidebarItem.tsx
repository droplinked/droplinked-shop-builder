import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";

const DashboardLayoutSidebarItem = ({ item, isExpanded, toggleExpanded }) => {
    const hasList = item?.list?.length > 0;

    return (
        <Box role="group" rounded="8px" display="flex" flexDirection="column" alignItems="flex-start" gap="10px" alignSelf="stretch" cursor="pointer">
            <Flex padding="12px" alignItems="center" gap="8px" alignSelf="stretch" _hover={{ backgroundColor: "#222" }} backgroundColor={isExpanded ? "#222" : "transparent"} rounded="8px" onClick={() => hasList && toggleExpanded()}>
                <Box width="20px" height="20px"><item.icon /></Box>
                <AppTypography cursor="pointer" width="full" color="#FFF" fontFamily="Inter" fontSize="14px" _groupHover={{ letterSpacing: "0.2px", fontWeight: "500" }} style={{ transition: "letter-spacing .1s linear" }} fontWeight="400" lineHeight="20px">{item?.title}</AppTypography>
                {hasList && <AppIcons.SidebarChevrondown width="20px" height="20px" color="white" style={{ transition: ".5s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} />}
            </Flex>
            {hasList && (
                <Box display="flex" alignItems="flex-start" alignSelf="stretch" style={{ maxHeight: isExpanded ? `${item?.list?.length * 48}px` : "0px", padding: isExpanded ? "0px 0px 12px 20px" : "0px 0px 0px 20px", opacity: isExpanded ? "1" : "0", overflow: "hidden", transition: "max-height .5s linear, opacity .5s linear, padding .5s linear" }}>
                    <Box display="flex" padding="0px 20px" flexDirection="column" justifyContent="center" alignItems="flex-start" gap="12px" flex="1 0 0" borderLeft="1px solid #3C3C3C">
                        {item?.list?.map((listItem) => <Link key={listItem?.listTitle} to={listItem?.linkTo}><AppTypography fontSize="14px" fontWeight="400" fontFamily="Inter" color="#7B7B7B" _hover={{ color: "white" }}>{listItem?.listTitle}</AppTypography></Link>)}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DashboardLayoutSidebarItem;
