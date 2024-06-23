import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import BlogContent from "./blog.content";
import { IBlog } from "../blogs.interface";
import React from "react";

function BlogDetails({ blog }: { blog: IBlog }) {
    return (
        <>
            <Image width={"100%"} height={{ md: "450px", base: "300px" }} src={blog.image} objectFit={"cover"} />
            <AppTypography color={"white"} fontSize={{ base: 24, md: 28, lg: 36 }}>
                {blog.title}
            </AppTypography>
            <Flex direction={"column"} gap={4}>
                <BlogContent blog={blog} />
                <AppTypography color={"white"} fontSize={16} fontWeight={700}>
                    Author: {blog.writer}
                </AppTypography>
                <HStack spacing={"12px"} align={"stretch"}>
                    {blog?.tags?.map((tag) => (
                        <Box key={tag} paddingX={"8px"} paddingY={"4px"} bg={"#2EC99E"} rounded={"16px"}>
                            <AppTypography color="#084836" fontSize={"14px"} fontWeight={"500"}>
                                {tag}
                            </AppTypography>
                        </Box>
                    ))}
                </HStack>
            </Flex>
        </>
    );
}

export default BlogDetails;
