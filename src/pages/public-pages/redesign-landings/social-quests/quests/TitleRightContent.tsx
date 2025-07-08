import { Box, Spinner, Text } from "@chakra-ui/react";
import { CheckMd } from "assets/icons/Sign/Check/CheckMd";
import React from "react";

interface Props {
  isFollowed: boolean;
  isreadyToClaim: boolean;
  isLoading: boolean;
}

export default function TitleRightContent({ isFollowed, isreadyToClaim, isLoading }: Props) {
  if (isLoading) {
    return <Spinner width="20px" height="20px" color="main.primary" marginInline="2px" />;
  }

  if (isFollowed) {
    return <CheckMd color="#2BCFA1" style={{ marginInline: "2px" }} />;
  }

  if (isreadyToClaim) {
    return (
      <Box
        paddingBlock={1}
        paddingInline={2}
        marginInline="6px"
        borderRadius={6}
        border="1px solid rgba(43, 207, 161, 0.04)"
        background="rgba(43, 207, 161, 0.10)"
      >
        <Text color="text.primary" fontSize={14}>Claim Reward</Text>
      </Box>
    );
  }

  return null;
}
