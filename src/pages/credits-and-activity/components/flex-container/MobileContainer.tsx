import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
    items: {
        content: ReactNode;
        isFullWidth?: boolean;
    }[];
}

export default function MobileContainer({ items }: Props) {
    return (
        <Flex
            width="100%"
            flexDirection="column"
            gap="16px"
        >
            {items.map((item) => {
                const { content } = item;

                return (
                    <Box
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        borderRadius="8px"
                        width="100%"
                    >
                        <Box>
                            {content}
                        </Box>
                    </Box>
                );
            })}
        </Flex>
    );
}
