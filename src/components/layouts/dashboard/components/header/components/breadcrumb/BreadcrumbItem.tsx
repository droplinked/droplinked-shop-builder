import React from "react";
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd";
import { ChevronrightSm } from "assets/icons/Navigation/ChevronRight/ChevronrightSm";
import AppTypography from "components/common/typography/AppTypography";
import { BreadcrumbItem } from "./breadcrumbUtils";

interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  index: number;
  isMobile: boolean;
  isLast: boolean;
}

const BreadcrumbItemComponent: React.FC<BreadcrumbItemProps> = ({ item, index, isMobile, isLast }) => {
    
  return (
    <React.Fragment>
      {index > 0 && (isMobile ? <ChevronrightSm color="#B1B1B1" /> : <ChevronrightMd color="#B1B1B1" />)}
      <AppTypography
        textAlign="left"
        fontSize={isMobile ? "14px" : "16px"}
        fontWeight={isLast ? (isMobile ? "500" : "700") : "400"}
        color={isLast ? "white" : "text.subtext.placeholder.light"}
      >
        {item.title}
      </AppTypography>
    </React.Fragment>
  );
};

export default BreadcrumbItemComponent;
