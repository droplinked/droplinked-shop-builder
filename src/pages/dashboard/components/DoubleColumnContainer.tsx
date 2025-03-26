import { Flex, FlexProps } from "@chakra-ui/react"
import React, { Children } from "react"

// Used to render and handle the responsiveness of a two-column layout in the Dashboard page.
function DoubleColumnContainer({ children, ...rest }: FlexProps) {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 4, md: 6, lg: 4, "2xl": 6 }}
            {...rest}
        >
            {Children.map(children, (child) => (
                <Flex flex={{ base: 1, lg: 0.5 }}>
                    {child}
                </Flex>
            ))}
        </Flex>
    )
}

export default DoubleColumnContainer