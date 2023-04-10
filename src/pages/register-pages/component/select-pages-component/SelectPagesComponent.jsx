import { useLocation } from "react-router-dom";
import { useMemo } from "react";

import { SideText } from "../../RegisterPages-style";
import { useCustomNavigate } from "../../../../hooks/useCustomeNavigate/useCustomNavigate";

const SelectPagesComponent = () => {
    
  const { shopNavigate } = useCustomNavigate();
  const currentPath = useLocation().pathname;

  const isSettings = useMemo(() => {
    return currentPath.includes("settings");
  }, [currentPath]);

  return (
    <>
      <SideText
        color={currentPath.includes("shop-info") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/shop-info");
        }}
      >
        Shop info
      </SideText>
      <SideText
        color={currentPath.includes("contact-info") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/contact-info");
        }}
      >
        Contact options
      </SideText>
      <SideText
        color={currentPath.includes("design") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/design");
        }}
      >
        Design template
      </SideText>
    </>
  );
};

export default SelectPagesComponent;
