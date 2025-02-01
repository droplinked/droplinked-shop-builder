import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
    items: {
        content: ReactNode;
        isFullWidth?: boolean;
    }[];
}

export default function DesktopContainer({ items }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            width={"100%"}
            border={"1px solid #292929"}
            borderRadius={"8px"}
            flexWrap={"wrap"}
        >
            {items.map((item, index) => {
                const { isFullWidth, content } = item;
                const notLastItem = index !== items.length - 1

                return (
                    <Flex
                        flexDirection={"column"}
                        width={isFullWidth ? "100%" : { base: "100%", md: "50%" }}
                        {...((isFullWidth || isSmallerThan768) && notLastItem) && { borderBottom: "1px solid #292929" }}
                        {...!isFullWidth && notLastItem && !isSmallerThan768 && { borderRight: "1px solid #292929" }}
                    >
                        <Box p={{ base: 4, md: 6 }}>
                            {content}
                        </Box>
                    </Flex>
                );
            })}
        </Flex >
    );
}
