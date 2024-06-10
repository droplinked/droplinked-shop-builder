import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import { IBlog } from "./blogs.interface";
import { time_ago } from "lib/utils/heper/helpers";

const LatestBlog = ({ blog }: { blog: IBlog }) => {
    return (
        <Box width={"full"} pos={"relative"} height={"512px"}>
            <Image width={"full"} height={"512px"} objectFit={"cover"} rounded={"32px"} src={blog?.image} />
            <Flex
                position={"absolute"}
                rounded={"32px"}
                gap={"24px"}
                direction={"column"}
                height={"50%"}
                bg={"#00000080"}
                bottom={"0px"}
                left={"0px"}
                width={"full"}
                alignItems={"start"}
                justifyContent={"center"}
                padding={"24px"}
            >
                <AppTypography color="white" fontSize={"32px"} fontWeight={"700"} width={"full"}>
                    {blog?.title}
                </AppTypography>
                <HStack spacing={"12px"} align={"stretch"}>
                    {blog?.tags?.map((tag) => (
                        <Box key={tag} paddingX={"16px"} paddingY={"6px"} bg={"#2EC99E"} rounded={"24px"}>
                            <AppTypography color="#084836" fontSize={"24px"} fontWeight={"500"}>
                                {tag}
                            </AppTypography>
                        </Box>
                    ))}
                </HStack>
                <HStack>
                    <AppIcons.Clock fill="#C2C2C2" width={"16px"} height={"16px"} />
                    <AppTypography color="white" fontWeight={"500"} fontSize={"18px"}>
                        Last Update: {time_ago(blog?.updatedAt)}
                    </AppTypography>
                </HStack>
                <HStack>
                    <AppIcons.Pen width={"16px"} height={"16px"} color="#C2C2C2" />
                    <AppTypography color="white" fontWeight={"500"} fontSize={"18px"}>
                        By {blog?.writer}
                    </AppTypography>
                </HStack>
            </Flex>
        </Box>
    );
};

export default LatestBlog;
