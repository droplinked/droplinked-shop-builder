import { HStack, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import React from "react";

const LoadingBlogs = () => {
    return (
        <VStack justifyContent={"center"} alignItems={"center"} width={"full"} spacing={"32px"} padding={"108px 64px 64px 64px"}>
            <Skeleton width={"full"} height={"512px"} rounded={"32px"} />
            <HStack spacing={"24px"} paddingY={"200px"} align={"stretch"} width={"full"} justifyContent={"space-between"}>
                <VStack spacing={"24px"} width={"full"}>
                    {Array.from({ length: 3 }).map((_, key) => (
                        <VStack align={"stretch"} width={"full"} key={key} justifyContent={"space-between"} spacing={"24px"}>
                            <Skeleton width={"100%"} minWidth={"300px"} height={"300px"} borderRadius={8} />
                            <VStack>
                                <SkeletonText width={"full"} borderRadius={2} />
                            </VStack>
                        </VStack>
                    ))}
                </VStack>
                <VStack spacing={"24px"} width={"full"} style={{ marginTop: -150 }}>
                    {Array.from({ length: 3 }).map((_, key) => (
                        <VStack align={"stretch"} width={"full"} key={key} justifyContent={"space-between"} spacing={"24px"}>
                            <Skeleton width={"100%"} minWidth={"300px"} height={"300px"} borderRadius={8} />
                            <VStack width={"full"}>
                                <SkeletonText width={"full"} borderRadius={2} />
                            </VStack>
                        </VStack>
                    ))}
                </VStack>
                <VStack spacing={"24px"} width={"full"}>
                    {Array.from({ length: 3 }).map((_, key) => (
                        <VStack align={"stretch"} width={"full"} key={key} justifyContent={"space-between"} spacing={"24px"}>
                            <Skeleton width={"100%"} minWidth={"300px"} height={"300px"} borderRadius={8} />
                            <VStack width={"full"}>
                                <SkeletonText width={"full"} borderRadius={2} />
                            </VStack>
                        </VStack>
                    ))}
                </VStack>
            </HStack>
        </VStack>
    );
};

export default LoadingBlogs;
