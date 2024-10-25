import { Circle, Flex, SquareProps, TextProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { Fragment } from 'react'

interface Props {
    options: any[]
    circleProps?: SquareProps
    textProps?: TextProps
}

function SKUOptions({ options, circleProps, textProps }: Props) {
    if (!options) return null

    const sortSKUOptions = (options) => {
        if (!options) return []
        const colorOption = options.find(opt => opt.variantName === "Color")
        const sizeOption = options.find(opt => opt.variantName === "Size")
        const otherOptions = options.filter(opt => !["Color", "Size"].includes(opt.variantName))
        return [colorOption, sizeOption, ...otherOptions].filter(Boolean)
    }

    return (
        <Flex
            flex={1}
            alignItems="center"
            gap={8}
            overflow="scroll"
            sx={{
                overflowY: "scroll",
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none"
            }}
        >
            {
                sortSKUOptions(options).map((option: any, index: number) => (
                    <Fragment key={index}>
                        {option?.variantName === "Color" ?
                            <Circle size={6} mr={-4} bgColor={option?.value} {...circleProps} /> :
                            <AppTypography
                                position="relative"
                                fontSize={16}
                                fontWeight={500}
                                color="white"
                                _after={{ content: "''", position: "absolute", top: 0, bottom: 0, right: "-16px", width: "1px", backgroundColor: "#3C3C3C" }}
                                _last={{ _after: { display: "none" } }}
                                {...textProps}
                            >
                                {option?.caption}
                            </AppTypography>
                        }
                    </Fragment>
                ))
            }
        </Flex>
    )
}

export default SKUOptions