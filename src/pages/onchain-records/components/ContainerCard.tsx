import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { ReactNode } from "react";

interface Props {
    items?: {
        title: string;
        content: string | number | ReactNode;
    }[];
    hasBorder?: boolean;
    title: string;
    titleRightContent?: string | ReactNode;
    children?: ReactNode
}

export default function ContainerCard({ items, hasBorder, title, titleRightContent, children }: Props) {
    return (
        <Flex width="100%" flexDirection="column" gap={6} border="1px solid" borderColor="neutral.gray.800" borderRadius={16}>
            <Flex {...(hasBorder && { borderBottom: "1px solid", borderColor: "neutral.gray.800", pb: 6 })} px={6} pt={6} alignItems="center" justifyContent="space-between">
                <AppTypography color="#fff" fontSize={16} fontWeight={500}>
                    {title}
                </AppTypography>
                {titleRightContent && (
                    <AppTypography color="#B1B1B1" fontSize={14} fontWeight={400}>
                        {titleRightContent}
                    </AppTypography>
                )}
            </Flex>
            <Flex flexDirection="column" gap={4} px={6} pb={6}>
                {items.map((item, index) => {
                    const isReactNode = typeof item.content === "object"
                    if (!Object.keys(item).length) return null

                    return (
                        <Flex justifyContent="space-between" alignItems="center" gap={8} key={index}>
                            <AppTypography color="text.subtext.placeholder.dark" fontSize={14} fontWeight={400}>
                                {item.title}
                            </AppTypography>
                            {isReactNode ?
                                item.content
                                :
                                <AppTypography color="#fff" fontSize={14} fontWeight={400}>
                                    {item.content}
                                </AppTypography>
                            }
                        </Flex>
                    )
                })}
                {children}
            </Flex>
        </Flex>
    )
}
