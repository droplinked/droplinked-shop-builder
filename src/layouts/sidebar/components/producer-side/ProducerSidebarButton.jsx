import { Flex, Image, Text, Box } from "@chakra-ui/react";

import { useSideBar } from "../../../../context/sidebar/sidebar-context";

const ProducerSidebarButton = ({ text, icon, click, active }) => {
  const { showSideBar } = useSideBar();

  return (
    <Flex
      py="12px"
      mb="16px"
      bg="transparent"
      cursor="pointer"
      alignItems="center"
      _hover={{
        filter:
          "invert(57%) sepia(70%) saturate(472%) hue-rotate(113deg) brightness(94%) contrast(82%)",
      }}
      onClick={click}
      filter={
        active
          ? "invert(57%) sepia(70%) saturate(472%) hue-rotate(113deg) brightness(94%) contrast(82%)"
          : ""
      }
    >
      <Image w="24px" h="24px" src={icon} stroke="red" />

      <Box
        w={showSideBar ? "150px" : "0px"}
        pl="16px"
        overflow="hidden"
        transition="width 1s"
      >
        <Text
          color="white"
          w="150px"
          fontWeight="500"
          fontSize={{ lg: "12px", xl: "18px" }}
          h="100%"
          alignItems="center"
          transform={
            showSideBar ? "translate(0px,0px)" : "translate(-150px,0px)"
          }
          transition="transform 1s"
        >
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProducerSidebarButton;
