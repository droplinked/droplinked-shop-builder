import React from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";

const EventCardSkeleton = () => {
  return (
    <Flex
      alignItems={"flex-start"}
      flexDirection={"column"}
      gap={"12px"}
      padding={"12px"}
      borderRadius={"12px"}
      border={"1px solid #5D5D5D"}
      position={"relative"}
      width={"327px"}
      height={"370px"}
    >
      <Skeleton width={"100%"} height={"185px"} borderRadius={"10px"} />

      <Skeleton width={"120px"} height={"18px"} borderRadius={"2px"} />

      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventCalendar />
        <Skeleton width={"180px"} height={"10px"} borderRadius={"2px"} />
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventLocation />
        <Skeleton width={"140px"} height={"10px"} borderRadius={"2px"} />
      </Flex>

      <BasicButton
        width={"100%"}
        isDisabled
      >
        Import
      </BasicButton>
    </Flex>
  );
};

export default EventCardSkeleton;
