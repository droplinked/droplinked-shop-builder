import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import TABS from '../tabsConstants'

interface TabButtonsProps {
  onTabChange: (tabName: string) => void;
  activeTab: string;
}

const TabButtons: React.FC<TabButtonsProps> = ({ onTabChange, activeTab }) => {
  // لیست تب‌ها و نام‌های آنها
  const tabs = [
    { name: TABS.DIRECT_LINK },
    { name: TABS.PAYMENT_LINK },
    { name: TABS.PRODUCT_TILE },
    { name: TABS.SOCIAL_TILE },
  ];

  return (
    <Box paddingX="16px" paddingTop='16px' paddingBottom='0px' width="100%">
      <Flex justifyContent="space-between">
        {tabs.map((tab) => (
          <Box key={tab.name} textAlign="center">
            {/* دکمه تب */}
            <Text
              onClick={() => onTabChange(tab.name)}
              cursor="pointer"
              fontFamily="Inter"
              fontSize="16px"
              fontStyle="normal"
              fontWeight={activeTab === tab.name ? "500" : "400"}
              lineHeight="24px"
              color={activeTab === tab.name ? "#FFF" : "#7B7B7B"}
            >
              {tab.name}
            </Text>
            {/* خط سفید زیر دکمه فعال */}
            {activeTab === tab.name && (
              <Box
                marginTop="16px"
                height="2px"
                width="100%"
                bg="#FFF"
              />
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default TabButtons;
