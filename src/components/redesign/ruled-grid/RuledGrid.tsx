import { Box, Grid, GridProps } from "@chakra-ui/react"
import React from "react"

interface Props extends GridProps {
    columns: number
    nested?: boolean
}

function RuledGrid({ columns, nested = false, children, ...rest }: Props) {
    // Convert children to an array
    const childrenArray = React.Children.toArray(children)

    return (
        <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            border={nested ? "unset" : "1px solid #292929"}
            overflow="hidden"
            {...rest}
        >
            {childrenArray.map((child, index) => (
                <Box
                    borderRight={index % columns !== columns - 1 ? "1px solid #292929" : "none"}
                    borderBottom={index < childrenArray.length - columns ? "1px solid #292929" : "none"}
                >
                    {child}
                </Box>
            ))}
        </Grid>
    )
}

export default RuledGrid