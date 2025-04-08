import { Grid, GridProps } from "@chakra-ui/react"
import React, { Children, ReactNode } from "react"

// Type-safe props for a two-child layout
interface DoubleColumnContainerProps extends GridProps {
    children: [ReactNode, ReactNode] // Enforce exactly two children
}

/**
 * A responsive container that lays out exactly two children in a single column on small screens
 * and two equal-width columns on large screens. Children always fill available width.
 *
 * @param children - Exactly two components to render in the layout
 * @param rest - Additional GridProps from Chakra UI
 */
function DoubleColumnContainer({ children, ...rest }: DoubleColumnContainerProps) {
    return (
        <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }} // 1 column at base, 2 at lg
            gap={{ base: 4, md: 6, lg: 4, "2xl": 6 }}
            alignItems="start"
            {...rest}
        >
            {Children.map(children, (child) => (
                <>{child}</> // No wrapper—Grid enforces full width
            ))}
        </Grid>
    )
}

export default DoubleColumnContainer