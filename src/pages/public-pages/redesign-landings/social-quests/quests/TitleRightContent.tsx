import { Box, Spinner, Text } from "@chakra-ui/react";
import { CheckMd } from "assets/icons/Sign/Check/CheckMd";
import React from "react";

export default function TitleRightContent() {
  const isReadyToClaim = false;
  const isClaimed = false;
  const isLoading = false;

  return (
    <>
      {isReadyToClaim && (
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
      )}
      {isClaimed && <CheckMd color="#2BCFA1" style={{ marginInline: "2px" }} />}
      {isLoading && <Spinner width="20px" height="20px" color="main.primary" marginInline="2px" />}
    </>
  );
}
