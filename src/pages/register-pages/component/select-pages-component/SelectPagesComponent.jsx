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
        cursor={isSettings && "pointer"}
        color={currentPath.includes("shop-info") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/shop-info");
        }}
      >
        Store info
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("design") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/design");
        }}
      >
        Store design
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("technical") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/technical");
        }}
      >
        Payment options
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("contact-info") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/contact-info");
        }}
      >
        Contact options
      </SideText>
    </>
  );
};

export default SelectPagesComponent;
