import { Flex, Text } from '@chakra-ui/react'
import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import Button from 'components/redesign/button/Button'
import React from 'react'

export default function MobileDrawerButton({ onOpen }: { onOpen: () => void }) {
    return (
        <Button
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            width="100%"
            borderRadius="0"
            onClick={onOpen}
            bg="#141414"
            color="#fff"
            borderColor="#292929"
            borderWidth="1px 0 0 0"
            _hover={{ bg: "#1a1a1a" }}
            zIndex="1000"
            height="auto"
            py={2}
            borderTopRadius={16}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"} width="100%">
                <Flex gap={4} alignItems={"center"}>
                    <Flex
                        padding={3}
                        justify={"center"}
                        align={"center"}
                        border={"1px solid #292929"}
                        borderRadius={8}
                        background={"#1c1c1c"}
                    >
                        <ShopLg color={"#fff"} />
                    </Flex>
                    <Text color={"#fff"} fontSize={16} fontWeight={500}>
                        Store Preview
                    </Text>
                </Flex>
                <ChevronupLg color='#fff' />
            </Flex>
        </Button>
    )
}
