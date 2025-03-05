import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingState = () => (
    <Flex
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
    >
        <Spinner color="#fff" />
        <Text
            fontSize={14}
            fontWeight={500}
            color={"#fff"}
        >
            Uploading..., Please Wait.
        </Text>
    </Flex>
);

export default LoadingState;
