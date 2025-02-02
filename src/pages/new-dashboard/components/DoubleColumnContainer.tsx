import { Flex, FlexProps } from "@chakra-ui/react"
import React, { Children, PropsWithChildren } from "react"

interface Props extends PropsWithChildren, FlexProps { }

// Used to render and handle the responsiveness of a two-column layout in the Dashboard page.
function DoubleColumnContainer({ children, ...rest }: Props) {
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 4, xl: 6 }}
            {...rest}
        >
            {Children.map(children, (child) => (
                <Flex flex={{ base: "1", md: "0.5" }}>
                    {child}
                </Flex>
            ))}
        </Flex>
    )
}

export default DoubleColumnContainer