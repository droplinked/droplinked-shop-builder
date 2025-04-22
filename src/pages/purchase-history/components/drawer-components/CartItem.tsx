import { Box, Flex, Text } from '@chakra-ui/react'
import { AffiliateSm } from 'assets/icons/System/Affiliate/AffiliateSm'
import AppImage from 'components/common/image/AppImage'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { IOrderDetailsItems } from 'lib/apis/order/interfaces'
import React from 'react'
import TitledText from './TitledText'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'

/**
    * CartItem component displays information about a single item in the cart
 */

export default function CartItem({ item }: { item: IOrderDetailsItems }) {
    const { image, isAffiliate, options, price, title, quantity } = item ?? {}

    return (
        <Flex
            border="1px solid #292929"
            borderRadius={16}
            flexDirection="column"
        >
            <Flex
                gap={6}
                flexDirection="column"
                p={{ base: 4, md: 6 }}
                borderBottom="1px solid #292929"
                width="100%"
            >
                <Flex justifyContent="space-between" alignItems="start">
                    <AppImage src={image} width="48px" height="48px" borderRadius="8px" />
                    {isAffiliate &&
                        <Box background="label.success" p={2} borderRadius="full">
                            <AffiliateSm color="#2BCFA1" />
                        </Box>
                    }
                </Flex>
                <Text color="#fff" fontSize={16} fontWeight={500}>{title}</Text>
                <Flex gap={2} flexWrap="wrap" alignItems="center">
                    {Object.keys(options).length > 0 ?
                        Object.entries(options).map(([key, { caption }]) => (
                            <DotSeparatedList key={key} border="1px solid #292929" px={4} py={1} borderRadius="full">
                                <Text color="#7b7b7b" fontSize={14} fontWeight={400}>{key}</Text>
                                <Text color="#fff" fontSize={14} fontWeight={400}>{caption}</Text>
                            </DotSeparatedList>
                        ))
                        : null}
                    <DotSeparatedList border="1px solid #292929" px={4} py={1} borderRadius="full">
                        <Text color="#7b7b7b" fontSize={14} fontWeight={400}>Quantity</Text>
                        <Text color="#fff" fontSize={14} fontWeight={400}>{quantity}</Text>
                    </DotSeparatedList>
                </Flex>
            </Flex>
            <Flex flexDirection="column" p={{ base: 4, md: 6 }} gap={1}>
                <TitledText title='Unit Price' direction='row' text={<FormattedPrice price={price / quantity} />} />
                <TitledText title='Total' direction='row' text={<FormattedPrice price={price} fontSize={16} fontWeight={700} />} />
            </Flex>
        </Flex>
    )
}
