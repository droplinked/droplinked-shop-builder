import { Box, Flex, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import { IBlog } from "../blogs.interface";
import BlogContent from "./blog.content";

function BlogDetails({ blog }: { blog: IBlog }) {
    return (
        <Flex mt={"40px"} direction={"column"} gap={12} p={{ base: 4, md: 8, lg: "64px" }}>
            <Image width={"100%"} height={{ md: "450px", base: "300px" }} src={blog.image} objectFit={"cover"} />
            <AppTypography color={"white"} fontSize={{ base: 24, md: 28, lg: 36 }}>
                {blog.title}
            </AppTypography>
            <Flex direction={"column"} gap={4} width={"100%"}>
                <BlogContent blog={blog} />
                <AppTypography color={"white"} fontSize={16} fontWeight={700}>
                    Author: {blog.writer}
                </AppTypography>
                <Flex flexWrap={"wrap"} gap={3}>
                    {blog?.tags?.map((tag) => (
                        <Box key={tag} paddingX={"8px"} paddingY={"4px"} bg={"#2EC99E"} rounded={"16px"}>
                            <AppTypography color="#084836" fontSize={"14px"} fontWeight={"500"}>
                                {tag}
                            </AppTypography>
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default BlogDetails;
