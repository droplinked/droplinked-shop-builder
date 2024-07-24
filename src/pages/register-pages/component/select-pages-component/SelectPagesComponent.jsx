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
        Wallet and Payment
      </SideText>

      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("tile") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/tile");
        }}
      >
        Product Tile Design
      </SideText>

      {isSettings && (
        <SideText
          cursor={isSettings && "pointer"}
          color={currentPath.includes("coupons") ? "primary" : "lightGray"}
          onClick={() => {
            if (isSettings) shopNavigate("settings/coupons");
          }}
        >
          Coupons
        </SideText>
      )}

      {isSettings && (
        <SideText
          cursor={isSettings && "pointer"}
          color={currentPath.includes("admins") ? "primary" : "lightGray"}
          onClick={() => {
            if (isSettings) shopNavigate("settings/admins");
          }}
        >
          Admins
        </SideText>
      )}
    </>
  );
};

export default SelectPagesComponent;
