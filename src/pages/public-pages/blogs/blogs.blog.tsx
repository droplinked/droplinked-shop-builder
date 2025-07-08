import { Box, VStack, Image, HStack } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { getTimeAgo } from "utils/helpers";
import React from "react";
import { Link } from "react-router-dom";
import { IBlogListItem } from "./blogs.interface";
 
const Blog = ({ blog }: { blog: IBlogListItem }) => {

    return (
        <VStack
            boxShadow="md"
            width={"full"}
            transition="all 0.3s ease-in-out"
            _hover={{
                boxShadow: "lg",
            }}
        >
            <Box position="relative" role="group" width={"full"} height="300px" transition="all 0.5s ease-in-out">
                <Link to={`/blogs/${blog?.slug}`}>
                    <Image
                        src={blog?.image}
                        objectFit="cover"
                        borderRadius="md"
                        _groupHover={{
                            filter: "grayscale(100%) brightness(30%)",
                            transition: "filter 0.5s ease-in-out",
                        }}
                        width="full"
                        height="full"
                        rounded={"16px"}
                        cursor={"pointer"}
                    />
                </Link>
                <AppTypography
                    style={{
                        WebkitTextStrokeWidth: "2px",
                        WebkitTextStrokeColor: "white",
                        transition: "opacity 0.5s ease-in-out, color 0.5s ease",
                    }}
                    backgroundPosition="center"
                    backgroundSize="contain"
                    _groupHover={{ opacity: "1" }}
                    fontWeight="800"
                    fontSize="36px"
                    fontStyle="italic"
                    opacity="0"
                    padding="12px"
                    position="absolute"
                    top="5%"
                    width="full"
                    textAlign="center"
                    backgroundImage={blog?.image}
                    backgroundClip="text"
                    backgroundRepeat="no-repeat"
                >
                    {blog?.title}
                </AppTypography>
                <VStack
                    padding="12px"
                    opacity="0"
                    _groupHover={{ opacity: "1", transition: "opacity 0.5s" }}
                    spacing="12px"
                    width="full"
                    alignItems="flex-start"
                    pos="absolute"
                    bottom="5%"
                    transition="opacity 0.5s"
                >
                    <HStack align="stretch" maxW={"full"} flexWrap={"wrap"}>
                        {blog?.tags?.map((tag) => (
                            <Box paddingX="16px" paddingY="6px" bg="#2EC99E" rounded="24px">
                                <AppTypography color="#084836" fontSize="10px" fontWeight="500">
                                    {tag}
                                </AppTypography>
                            </Box>
                        ))}
                    </HStack>
                    <HStack>
                        <AppIcons.Clock fill="#C2C2C2" width={"14px"} height={"14px"} />
                        <AppTypography color="white" fontWeight="500" fontSize="10px">
                            Last Update: {getTimeAgo(blog?.createdAt)}
                        </AppTypography>
                    </HStack>
                </VStack>
            </Box>
            <VStack width={"full"} alignItems={"flex-start"}>
                <Link to={`/blogs/${blog.slug}`}>
                    <AppTypography color="white" fontSize="xl" cursor={"pointer"}>
                        {blog?.title}
                    </AppTypography>
                </Link>
                <HStack>
                    <AppIcons.Pen width={"16px"} height={"16px"} color="#C2C2C2" />
                    <AppTypography color="white" fontWeight={"500"} fontSize={"16px"}>
                        By {blog?.writer}
                    </AppTypography>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default Blog;
