import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

const BlogLoading = () => {
    return (
        <Flex direction={"column"} p={"64px"} mt={"40px"} gap={12} maxWidth={"1400px"}>
            <Skeleton width={"100%"} height={{ md: "450px", base: "300px" }}></Skeleton>
            <Skeleton maxWidth={"100%"} width={"500px"} height={{ base: "31.91px", md: "33.59px", lg: "43.2px" }}></Skeleton>
            <Flex direction={"column"} gap={4}>
                <Flex direction={"column"} gap={1}>
                    <Skeleton width={"100%"} height={"24px"}></Skeleton>
                    <Skeleton width={"100%"} height={"24px"}></Skeleton>
                    <Skeleton width={"100%"} height={"24px"}></Skeleton>
                </Flex>
                <Skeleton width={"150px"} height={"24px"}></Skeleton>
                <Skeleton width={"200px"} height={"24px"}></Skeleton>
            </Flex>
        </Flex>
    );
};

export default BlogLoading;
