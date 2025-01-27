import { Box, Flex, Text } from '@chakra-ui/react'
import { SKUOption } from 'pages/products/utils/types'
import React, { Fragment } from 'react'

interface Props {
    options: SKUOption[]
}

export default function SkuVariants({ options }: Props) {
    return (
        <Flex
            align="center"
            gap={4}
            color="white"
        >
            {options.map((option, index) => (
                <Fragment key={`${option.variantName}-${option.value}`}>
                    <OptionRenderer option={option} />
                    {index < options.length - 1 && (
                        <Text color="#292929" mx={2}>
                            •
                        </Text>
                    )}
                </Fragment>
            ))}
        </Flex>
    )
}

const OptionRenderer = ({ option }: { option: SKUOption }) => {
    if (option.variantName === "Color") {
        return (
            <Flex alignItems="center" gap={2}>
                <Box w={5} h={5} borderRadius={2} bg={option.value} />
                <Text>{option.caption}</Text>
            </Flex>
        )
    }

    return <Text>{option.caption}</Text>
}