import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { SideText } from "pages/register-pages/RegisterPages-style";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

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
        color={currentPath === "/analytics/settings/design" ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/design");
        }}
      >
        Store Design
      </SideText>

      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath.includes("account-settings") ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("/analytics/account-settings");
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

      <SideText
        cursor={isSettings && "pointer"}
        color={currentPath === "/analytics/settings/payment-link-design" ? "primary" : "lightGray"}
        onClick={() => {
          if (isSettings) shopNavigate("settings/payment-link-design");
        }}
      >
        Payment Link Design
      </SideText>

      {isSettings && (
        <SideText
          cursor={isSettings && "pointer"}
          color={currentPath.includes("account-settings") ? "primary" : "lightGray"}
          onClick={() => {
            if (isSettings) shopNavigate("/analytics/account-settings");
          }}
        >
          Coupons
        </SideText>
      )}

      {isSettings && (
        <SideText
          cursor={isSettings && "pointer"}
          color={currentPath.includes("account-settings") ? "primary" : "lightGray"}
          onClick={() => {
            if (isSettings) shopNavigate("/analytics/account-settings");
          }}
        >
          Admins
        </SideText>
      )}
    </>
  );
};

export default SelectPagesComponent;
