import React from "react";
import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import BreadcrumbItemComponent from "./BreadcrumbItem";
import { getDashboardBreadcrumbItems, getNonDashboardBreadcrumbItems } from "./breadcrumbUtils";

interface BreadcrumbProps {
  isMobile?: boolean;
  isDashboard?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ isMobile = false, isDashboard = true }) => {
  const { pathname } = useLocation();

  const breadcrumbItems = isDashboard ? getDashboardBreadcrumbItems(pathname) : getNonDashboardBreadcrumbItems(pathname);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  // Skip the first item in breadcrumbItems for dashboard pages only
  const displayedItems = isDashboard ? breadcrumbItems.slice(1) : breadcrumbItems;

  return (
    <Flex
      width="100%"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap={isMobile ? "wrap" : "nowrap"}
      gap="12px"
    >
      {displayedItems.map((item, index) => (
        <BreadcrumbItemComponent
          key={index}
          item={item}
          index={index}
          isMobile={isMobile}
          isLast={index === displayedItems.length - 1}
        />
      ))}
    </Flex>
  );
};

export default Breadcrumb;
