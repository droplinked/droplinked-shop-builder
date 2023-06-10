import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { SideText } from "pages/register-pages/RegisterPages-style";

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
        Store Info
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("design") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/design");
        }}
      >
        Store Design
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("technical") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/technical");
        }}
      >
        Payment Options
      </SideText>
      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("contact-info") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/contact-info");
        }}
      >
        Social Links
      </SideText>
    </>
  );
};

export default SelectPagesComponent;
