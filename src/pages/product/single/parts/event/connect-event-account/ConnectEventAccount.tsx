import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";

const ConnectEventAccount = () => {
  return (
    <Flex
      alignItems={"flex-start"}
      flexDirection={"column"}
      gap={"48px"}
      alignSelf={"stretch"}
      padding={"50px 60px"}
      borderRadius={"8px"}
      bgColor={"#1C1C1C"}
    >
      <Flex
        alignItems={"flex-start"}
        flexDirection={"column"}
        gap={"8px"}
        width={"100%"}
      >
        <BasicButton>Connect Account</BasicButton>
        <Flex alignItems={"center"} gap={"4px"}>
          <AppTypography fontSize={"18px"} fontWeight={700} color={"#FFF"}>Connect to droplinked events application</AppTypography>
          <AppTypography fontSize={"18px"} fontWeight={700} color={"#2BCFA1"}>*</AppTypography>
        </Flex>
        <AppTypography fontSize={"14px"} fontWeight={400} color={"#C2C2C2"}>Link your droplinked  events account to seamlessly manage events from a storefront.</AppTypography>
        <Flex padding={"19px 0"} alignItems={"center"} justifyContent={"center"} alignSelf={"stretch"} width={"100%"}>
          <Image src="https://upload-file-droplinked.s3.amazonaws.com/f0aad95928f617b559f093651e3a29f7869863eb5fbe212c7238021032cfd3bc_or.png" width={"100%"} height={"485px"} objectFit={"contain"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ConnectEventAccount;
