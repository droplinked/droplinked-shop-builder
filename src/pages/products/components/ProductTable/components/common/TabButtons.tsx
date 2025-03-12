import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";


interface TabButtonsProps {
  onTabChange: (tabName: string) => void;
  activeTab: string;
  tabs: { name: string }[];
}

const TabButtons: React.FC<TabButtonsProps> = ({ onTabChange, activeTab, tabs }) => {
  return (
    <Box paddingX="16px" paddingTop='16px' paddingBottom='0px' width="100%">
      <Flex justifyContent="space-between">
        {tabs.map((tab) => (
          <Box key={tab.name} textAlign="center" flex="1">
            <Text
              onClick={() => onTabChange(tab.name)}
              cursor="pointer"
              fontFamily="Inter"
              fontSize="16px"
              fontStyle="normal"
              fontWeight={activeTab === tab.name ? "500" : "400"}
              lineHeight="24px"
              color={activeTab === tab.name ? "neutral.white" : "text.subtextPlaceholder.dark"}
            >
              {tab.name}
            </Text>
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
